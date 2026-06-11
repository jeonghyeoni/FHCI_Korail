import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { appendEvent, buildSummary, loadEvents, saveSession, saveSummary } from "../analytics/storage.js";
import { setClarityExperimentContext } from "../analytics/clarity.js";
import { CARRIAGES, getSeatsForCarriage, TRAIN } from "../data/experiment.js";
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
    taskEndTime: null,
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
        taskEndTime: null,
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
      return { ...state, taskEndTime: action.timestamp, success: action.success };
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
    taskEndTime: state.taskEndTime,
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
    timestamp: event.timestamp || new Date().toISOString(),
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
    const timestamp = new Date().toISOString();
    dispatch({ type: "START_TASK", timestamp });
  }, []);

  const selectCarriage = useCallback((carriageNo, pointer = {}, options = {}) => {
    const normalizedCarriageNo = Number(carriageNo);
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
    const allSeats = CARRIAGES.flatMap((carriage) => getSeatsForCarriage(carriage.no));
    const currentSeats = getSeatsForCarriage(current.currentCarriage);
    const pool = current.taskId === "1" ? allSeats : currentSeats;
    const seat = getAutoSeat(current.taskId, pool);
    if (!seat) return { selected: false, reason: "no_available_seat" };
    if (seat.carriageNo !== current.currentCarriage) {
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
      .flatMap((carriage) => getSeatsForCarriage(carriage.no))
      .filter((seat) => seat.isAvailable);
    const seat = availableSeats[Math.floor(Math.random() * availableSeats.length)];

    if (!seat) return { selected: false, reason: "no_available_seat" };

    if (seat.carriageNo !== current.currentCarriage) {
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
    const current = stateRef.current;
    const timestamp = new Date().toISOString();
    const success = isTargetSeat(current.taskId, current.selectedSeat);
    const completedSession = { ...publicSession(current), taskEndTime: timestamp, success };

    dispatch({ type: "COMPLETE_TASK", timestamp, success });

    if (success) {
      logEvent({
        eventType: "task_success",
        eventLabel: `task:${current.taskId}:success`,
        seatId: current.selectedSeat?.id,
        carriageNo: current.selectedSeat?.carriageNo,
        xCoordinate: pointer.x,
        yCoordinate: pointer.y,
      });
    }

    logEvent({
      eventType: "task_complete",
      eventLabel: success ? "complete_success" : "complete_failed",
      seatId: current.selectedSeat?.id,
      carriageNo: current.selectedSeat?.carriageNo,
      xCoordinate: pointer.x,
      yCoordinate: pointer.y,
      metadata: { success },
    });

    saveSummary(buildSummary(completedSession, loadEvents({ inMemory: current.isTestMode })), { inMemory: current.isTestMode });
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
    },
  }), [autoSelectRandomSeat, autoSelectSeat, clearSelectedSeat, completeTask, logEvent, selectCarriage, selectSeat, startTask, state]);

  return <ExperimentContext.Provider value={value}>{children}</ExperimentContext.Provider>;
}

export function useExperiment() {
  const value = useContext(ExperimentContext);
  if (!value) {
    throw new Error("useExperiment must be used inside ExperimentProvider");
  }
  return value;
}
