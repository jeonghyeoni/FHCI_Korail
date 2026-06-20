import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { buildSubmissionPayload, queueTaskSummaryBackup } from "../analytics/submission.js";
import { appendEvent, buildSummary, loadEvents, loadSession, resetConditionRuntime, saveSession, saveSummary } from "../analytics/storage.js";
import { setClarityExperimentContext } from "../analytics/clarity.js";
import { CARRIAGES, getSeatsForCarriage, TRAIN } from "../data/experiment.js";
import { TASK1_TARGET, isSameSeatTarget } from "../data/taskTargets.js";
import {
  EXPERIMENT_SEQUENCE,
  TEST_MODE,
  generateTestParticipantId,
  getCurrentSequenceCondition,
  getOrCreateParticipantId,
  isTestMode,
  isSequenceComplete,
  isValidParticipantId,
  isValidTestParticipantId,
} from "../utils/experimentSequence.js";
import { getAutoSeat, getSeatMisclickReason, isTargetSeat } from "../utils/taskRules.js";
import { toKstISOString } from "../utils/time.js";

const ExperimentContext = createContext(null);

function parseExperimentParams(search) {
  const params = new URLSearchParams(search);
  const testMode = isTestMode(search, window.location.pathname);
  const explicitVariant = params.get("variant");
  const explicitTaskId = params.get("task");
  const explicitParticipantId = params.get("pid");
  const hasExplicitCondition = Boolean(explicitVariant || explicitTaskId);
  const sequenceCondition = testMode ? EXPERIMENT_SEQUENCE[0] : getCurrentSequenceCondition();
  const variant = explicitVariant || sequenceCondition.variant;
  const taskId = explicitTaskId || sequenceCondition.taskId;
  const participantId = testMode
    ? (isValidTestParticipantId(explicitParticipantId) ? explicitParticipantId : generateTestParticipantId())
    : getOrCreateParticipantId(explicitParticipantId || "");
  const errors = [];

  if (!["A", "B"].includes(variant)) errors.push("variant must be A or B");
  if (!["1", "2", "3"].includes(taskId)) errors.push("task must be 1, 2, or 3");
  if (!testMode && explicitParticipantId && !isValidParticipantId(explicitParticipantId)) {
    errors.push("pid must be a valid experiment participant id");
  }
  if (testMode && explicitParticipantId && !isValidTestParticipantId(explicitParticipantId)) {
    errors.push("test pid must be a valid temporary participant id");
  }

  return {
    isValid: errors.length === 0,
    errors,
    participantId,
    variant,
    taskId,
    isTestMode: testMode,
    mode: testMode ? TEST_MODE : "production",
    sequenceComplete: !testMode && !hasExplicitCondition && isSequenceComplete(),
  };
}

function initialState() {
  const params = parseExperimentParams(window.location.search);
  return {
    ...params,
    train: TRAIN,
    taskStarted: false,
    taskStartTime: null,
    taskStartEpochMs: null,
    taskEndTime: null,
    taskEndEpochMs: null,
    currentCarriage: 9,
    selectedSeat: null,
    success: false,
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "START_TASK":
      return {
        ...state,
        taskStarted: true,
        taskStartTime: action.timestamp,
        taskStartEpochMs: action.epochMs,
        taskEndTime: null,
        taskEndEpochMs: null,
        currentCarriage: 9,
        selectedSeat: null,
        success: false,
      };
    case "SET_CARRIAGE":
      return { ...state, currentCarriage: action.carriageNo, selectedSeat: action.clearSelectedSeat ? null : state.selectedSeat };
    case "SELECT_SEAT":
      return { ...state, selectedSeat: action.seat };
    case "UNSELECT_SEAT":
      return { ...state, selectedSeat: null };
    case "COMPLETE_TASK":
      return { ...state, taskEndTime: action.timestamp, taskEndEpochMs: action.epochMs, success: action.success };
    case "RESET_TASK":
      if (!state.taskStarted && !state.taskStartTime && !state.taskStartEpochMs && !state.taskEndTime && !state.taskEndEpochMs && !state.selectedSeat && !state.success && state.currentCarriage === 9) {
        return state;
      }
      return {
        ...state,
        taskStarted: false,
        taskStartTime: null,
        taskStartEpochMs: null,
        taskEndTime: null,
        taskEndEpochMs: null,
        currentCarriage: 9,
        selectedSeat: null,
        success: false,
      };
    default:
      return state;
  }
}

function publicSession(state) {
  return {
    participantId: state.participantId,
    variant: state.variant,
    taskId: state.taskId,
    taskStarted: state.taskStarted,
    taskStartTime: state.taskStartTime,
    taskStartEpochMs: state.taskStartEpochMs,
    taskEndTime: state.taskEndTime,
    taskEndEpochMs: state.taskEndEpochMs,
    currentCarriage: state.currentCarriage,
    selectedSeat: state.selectedSeat,
    success: state.success,
  };
}

function normalizeEvent(state, event) {
  return {
    participantId: state.participantId,
    variant: state.variant,
    taskId: state.taskId,
    timestamp: event.timestamp || toKstISOString(),
    pageName: event.pageName || document.body.dataset.pageName || "unknown",
    eventType: event.eventType,
    eventLabel: event.eventLabel || "",
    xCoordinate: Number.isFinite(event.xCoordinate) ? event.xCoordinate : null,
    yCoordinate: Number.isFinite(event.yCoordinate) ? event.yCoordinate : null,
    route: window.location.pathname,
    seatId: event.seatId || null,
    carriageNo: event.carriageNo || null,
    metadata: event.metadata || {},
  };
}

export function ExperimentProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);
  const stateRef = useRef(state);

  useEffect(() => {
    stateRef.current = state;
    saveSession(publicSession(state), { inMemory: state.isTestMode });
  }, [state]);

  useEffect(() => {
    if (state.isValid) {
      setClarityExperimentContext(state);
    }
  }, [state.isValid, state.participantId, state.taskId, state.variant]);

  const logEvent = useCallback((event) => {
    const current = stateRef.current;
    return appendEvent(normalizeEvent(current, event), { inMemory: current.isTestMode });
  }, []);

  const startTask = useCallback(() => {
    const epochMs = Date.now();
    const timestamp = toKstISOString(new Date(epochMs));
    const current = stateRef.current;
    const nextState = {
      ...current,
      taskStarted: true,
      taskStartTime: timestamp,
      taskStartEpochMs: epochMs,
      taskEndTime: null,
      taskEndEpochMs: null,
      currentCarriage: 9,
      selectedSeat: null,
      success: false,
    };
    stateRef.current = nextState;
    saveSession(publicSession(nextState), { inMemory: current.isTestMode });
    dispatch({ type: "START_TASK", timestamp, epochMs });
  }, []);

  const resetTask = useCallback(() => {
    const current = stateRef.current;
    resetConditionRuntime({
      participantId: current.participantId,
      variant: current.variant,
      taskId: current.taskId,
    }, { inMemory: current.isTestMode });
    dispatch({ type: "RESET_TASK" });
  }, []);

  const selectCarriage = useCallback((carriageNo, pointer = {}, options = {}) => {
    const normalizedCarriageNo = Number(carriageNo);
    stateRef.current = { ...stateRef.current, currentCarriage: normalizedCarriageNo, selectedSeat: options.clearSelectedSeat ? null : stateRef.current.selectedSeat };
    saveSession(publicSession(stateRef.current), { inMemory: stateRef.current.isTestMode });
    dispatch({ type: "SET_CARRIAGE", carriageNo: normalizedCarriageNo, clearSelectedSeat: Boolean(options.clearSelectedSeat) });
    logEvent({
      eventType: "car_change",
      eventLabel: `carriage:${normalizedCarriageNo}`,
      carriageNo: normalizedCarriageNo,
      xCoordinate: pointer.x,
      yCoordinate: pointer.y,
      metadata: { clearedSelectedSeat: Boolean(options.clearSelectedSeat) },
    });
  }, [logEvent]);

  const selectSeat = useCallback((seat, pointer = {}) => {
    const current = stateRef.current;
    const reason = getSeatMisclickReason(current.taskId, seat);

    if (!seat || !seat.isAvailable) {
      logEvent({
        eventType: "misclick",
        eventLabel: reason || "inactive_seat",
        seatId: seat?.id,
        carriageNo: seat?.carriageNo,
        xCoordinate: pointer.x,
        yCoordinate: pointer.y,
        metadata: { reason },
      });
      return { selected: false, reason };
    }

    if (current.selectedSeat?.id === seat.id) {
      stateRef.current = { ...current, selectedSeat: null };
      saveSession(publicSession(stateRef.current), { inMemory: current.isTestMode });
      dispatch({ type: "UNSELECT_SEAT" });
      logEvent({
        eventType: "seat_unselect",
        eventLabel: `seat:${seat.id}`,
        seatId: seat.id,
        carriageNo: seat.carriageNo,
        xCoordinate: pointer.x,
        yCoordinate: pointer.y,
      });
      return { selected: false, unselected: true };
    }

    stateRef.current = { ...current, selectedSeat: seat, currentCarriage: seat.carriageNo };
    saveSession(publicSession(stateRef.current), { inMemory: current.isTestMode });
    dispatch({ type: "SELECT_SEAT", seat });
    logEvent({
      eventType: "seat_select",
      eventLabel: `seat:${seat.id}`,
      seatId: seat.id,
      carriageNo: seat.carriageNo,
      xCoordinate: pointer.x,
      yCoordinate: pointer.y,
      metadata: { isWindow: seat.isWindow },
    });

    if (reason) {
      logEvent({
        eventType: "misclick",
        eventLabel: reason,
        seatId: seat.id,
        carriageNo: seat.carriageNo,
        xCoordinate: pointer.x,
        yCoordinate: pointer.y,
        metadata: { reason },
      });
    }

    return { selected: true, reason };
  }, [logEvent]);

  const autoSelectSeat = useCallback((pointer = {}) => {
    const current = stateRef.current;
    const allSeats = CARRIAGES.flatMap((carriage) => getSeatsForCarriage(carriage.no, current.taskId));
    const currentSeats = getSeatsForCarriage(current.currentCarriage, current.taskId);
    const pool = ["1", "2"].includes(current.taskId) ? allSeats : currentSeats;
    const task1AlternativeSeats = current.taskId === "1"
      ? pool.filter((seat) => seat.isAvailable && !isSameSeatTarget(seat, TASK1_TARGET))
      : [];
    const seat = current.taskId === "1" && task1AlternativeSeats.length
      ? task1AlternativeSeats[Math.floor(Math.random() * task1AlternativeSeats.length)]
      : getAutoSeat(current.taskId, pool);
    if (!seat) return { selected: false, reason: "no_available_seat" };
    if (seat.carriageNo !== current.currentCarriage) {
      stateRef.current = { ...stateRef.current, currentCarriage: seat.carriageNo };
      saveSession(publicSession(stateRef.current), { inMemory: current.isTestMode });
      dispatch({ type: "SET_CARRIAGE", carriageNo: seat.carriageNo });
      logEvent({
        eventType: "car_change",
        eventLabel: `carriage:${seat.carriageNo}`,
        carriageNo: seat.carriageNo,
        xCoordinate: pointer.x,
        yCoordinate: pointer.y,
        metadata: { source: "auto_select" },
      });
    }
    return selectSeat(seat, pointer);
  }, [logEvent, selectSeat]);

  const autoSelectRandomSeat = useCallback((pointer = {}) => {
    const current = stateRef.current;
    const availableSeats = CARRIAGES
      .flatMap((carriage) => getSeatsForCarriage(carriage.no, current.taskId))
      .filter((seat) => seat.isAvailable);
    const seat = availableSeats[Math.floor(Math.random() * availableSeats.length)];

    if (!seat) return { selected: false, reason: "no_available_seat" };

    if (seat.carriageNo !== current.currentCarriage) {
      stateRef.current = { ...stateRef.current, currentCarriage: seat.carriageNo };
      saveSession(publicSession(stateRef.current), { inMemory: current.isTestMode });
      dispatch({ type: "SET_CARRIAGE", carriageNo: seat.carriageNo });
      logEvent({
        eventType: "car_change",
        eventLabel: `carriage:${seat.carriageNo}`,
        carriageNo: seat.carriageNo,
        xCoordinate: pointer.x,
        yCoordinate: pointer.y,
        metadata: { source: "random_auto_select" },
      });
    }

    return selectSeat(seat, pointer);
  }, [logEvent, selectSeat]);

  const clearSelectedSeat = useCallback((pointer = {}) => {
    const current = stateRef.current;
    if (!current.selectedSeat) return { unselected: false };

    stateRef.current = { ...current, selectedSeat: null };
    saveSession(publicSession(stateRef.current), { inMemory: current.isTestMode });
    dispatch({ type: "UNSELECT_SEAT" });
    logEvent({
      eventType: "seat_unselect",
      eventLabel: `seat:${current.selectedSeat.id}`,
      seatId: current.selectedSeat.id,
      carriageNo: current.selectedSeat.carriageNo,
      xCoordinate: pointer.x,
      yCoordinate: pointer.y,
      metadata: { source: "clear_selected_seat" },
    });

    return { unselected: true };
  }, [logEvent]);

  const completeTask = useCallback((pointer = {}) => {
    const currentState = stateRef.current;
    const storedSession = loadSession({ inMemory: currentState.isTestMode });
    const storedStartEpochMs = Number.isFinite(storedSession?.taskStartEpochMs)
      ? storedSession.taskStartEpochMs
      : Date.parse(storedSession?.taskStartTime || "");
    const current = (!currentState.taskStartTime || !Number.isFinite(currentState.taskStartEpochMs)) && storedSession?.taskStartTime &&
      storedSession.participantId === currentState.participantId &&
      String(storedSession.taskId) === String(currentState.taskId) &&
      storedSession.variant === currentState.variant
      ? {
        ...currentState,
        taskStarted: true,
        taskStartTime: currentState.taskStartTime || storedSession.taskStartTime,
        taskStartEpochMs: Number.isFinite(currentState.taskStartEpochMs)
          ? currentState.taskStartEpochMs
          : (Number.isFinite(storedStartEpochMs) ? storedStartEpochMs : null),
      }
      : currentState;
    const endEpochMs = Date.now();
    const timestamp = toKstISOString(new Date(endEpochMs));
    const success = isTargetSeat(current.taskId, current.selectedSeat);

    if (!success) {
      logEvent({
        eventType: "misclick",
        eventLabel: `task:${current.taskId}:wrong_payment_seat`,
        seatId: current.selectedSeat?.id,
        carriageNo: current.selectedSeat?.carriageNo,
        xCoordinate: pointer.x,
        yCoordinate: pointer.y,
        metadata: { reason: "payment_with_wrong_seat" },
      });
      return false;
    }

    const completedSession = { ...publicSession(current), taskEndTime: timestamp, taskEndEpochMs: endEpochMs, success };
    stateRef.current = { ...current, taskEndTime: timestamp, taskEndEpochMs: endEpochMs, success };

    dispatch({ type: "COMPLETE_TASK", timestamp, epochMs: endEpochMs, success });

    logEvent({
      eventType: "task_success",
      eventLabel: `task:${current.taskId}:success`,
      seatId: current.selectedSeat?.id,
      carriageNo: current.selectedSeat?.carriageNo,
      xCoordinate: pointer.x,
      yCoordinate: pointer.y,
    });

    logEvent({
      eventType: "task_complete",
      eventLabel: "complete_success",
      seatId: current.selectedSeat?.id,
      carriageNo: current.selectedSeat?.carriageNo,
      xCoordinate: pointer.x,
      yCoordinate: pointer.y,
      metadata: { success },
    });

    const completedEvents = loadEvents({ inMemory: current.isTestMode });
    const completedSummary = buildSummary(completedSession, completedEvents);
    saveSummary(completedSummary, { inMemory: current.isTestMode });
    if (!current.isTestMode) {
      queueTaskSummaryBackup(buildSubmissionPayload({
        summary: completedSummary,
        state: current,
        eventLogs: completedEvents,
      }));
    }
    saveSession(completedSession, { inMemory: current.isTestMode });
    return success;
  }, [logEvent]);

  const value = useMemo(() => ({
    state,
    actions: {
      autoSelectRandomSeat,
      autoSelectSeat,
      clearSelectedSeat,
      completeTask,
      logEvent,
      selectCarriage,
      selectSeat,
      startTask,
      resetTask,
    },
  }), [autoSelectRandomSeat, autoSelectSeat, clearSelectedSeat, completeTask, logEvent, resetTask, selectCarriage, selectSeat, startTask, state]);

  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>;
}

export function useExperiment() {
  const value = useContext(ExperimentContext);
  if (!value) {
    throw new Error("useExperiment must be used inside ExperimentProvider");
  }
  return value;
}
