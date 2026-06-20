export const SESSION_KEY = "fhci_experiment_session";
export const EVENTS_KEY = "fhci_experiment_events";
export const SUMMARY_KEY = "fhci_experiment_summary";

const memoryStorage = {
  events: [],
  session: null,
  summary: null,
};

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function loadEvents(options = {}) {
  if (options.inMemory) {
    return memoryStorage.events;
  }

  return safeParse(localStorage.getItem(EVENTS_KEY), []);
}

export function appendEvent(event, options = {}) {
  const events = loadEvents(options);
  events.push(event);

  if (options.inMemory) {
    return event;
  }

  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  return event;
}

export function loadSession(options = {}) {
  if (options.inMemory) {
    return memoryStorage.session;
  }

  return safeParse(localStorage.getItem(SESSION_KEY), null);
}

export function saveSession(session, options = {}) {
  if (options.inMemory) {
    memoryStorage.session = session;
    return;
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSummary(options = {}) {
  if (options.inMemory) {
    return memoryStorage.summary;
  }

  return safeParse(localStorage.getItem(SUMMARY_KEY), null);
}

export function saveSummary(summary, options = {}) {
  if (options.inMemory) {
    memoryStorage.summary = summary;
    return;
  }

  localStorage.setItem(SUMMARY_KEY, JSON.stringify(summary));
}

function matchesCondition(record, condition) {
  return Boolean(
    record &&
      record.participantId === condition.participantId &&
      String(record.taskId) === String(condition.taskId) &&
      record.variant === condition.variant
  );
}

function isCompletedRecord(record) {
  return Boolean(record?.taskEndTime || record?.completedAt || record?.success || record?.taskSuccess);
}

function parseTimeMs(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value === null || value === undefined || value === "") return null;

  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function resetConditionRuntime(condition, options = {}) {
  if (options.inMemory) {
    memoryStorage.events = memoryStorage.events.filter((event) => !matchesCondition(event, condition));
    if (matchesCondition(memoryStorage.session, condition) && !isCompletedRecord(memoryStorage.session)) {
      memoryStorage.session = null;
    }
    if (matchesCondition(memoryStorage.summary, condition) && !isCompletedRecord(memoryStorage.summary)) {
      memoryStorage.summary = null;
    }
    return;
  }

  const events = loadEvents().filter((event) => !matchesCondition(event, condition));
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));

  const session = safeParse(localStorage.getItem(SESSION_KEY), null);
  if (matchesCondition(session, condition) && !isCompletedRecord(session)) {
    localStorage.removeItem(SESSION_KEY);
  }

  const summary = safeParse(localStorage.getItem(SUMMARY_KEY), null);
  if (matchesCondition(summary, condition) && !isCompletedRecord(summary)) {
    localStorage.removeItem(SUMMARY_KEY);
  }
}

export function buildSummary(session, events = loadEvents()) {
  const identityEvents = events.filter((event) => matchesCondition(event, session));
  const firstTaskEvent = identityEvents.reduce((earliest, event) => {
    const eventTime = parseTimeMs(event.timestamp);
    if (eventTime === null) return earliest;
    if (!earliest || eventTime < earliest.time) {
      return { event, time: eventTime };
    }
    return earliest;
  }, null);
  const startedAt = session.taskStartTime || firstTaskEvent?.event?.timestamp || null;
  const taskStart = parseTimeMs(session.taskStartEpochMs) ?? parseTimeMs(startedAt);
  const taskEnd = parseTimeMs(session.taskEndEpochMs) ?? parseTimeMs(session.taskEndTime);
  const taskEvents = taskStart !== null
    ? identityEvents.filter((event) => {
      const eventTime = parseTimeMs(event.timestamp);
      return eventTime !== null && eventTime >= taskStart;
    })
    : identityEvents;

  return {
    participantId: session.participantId,
    variant: session.variant,
    taskId: session.taskId,
    selectedSeat: session.selectedSeat,
    selectedCar: session.selectedSeat?.carriageNo ?? session.currentCarriage ?? null,
    taskSuccess: Boolean(session.success),
    success: Boolean(session.success),
    startedAt,
    completedAt: session.taskEndTime,
    taskStartTime: startedAt,
    taskStartEpochMs: taskStart,
    taskEndTime: session.taskEndTime,
    taskEndEpochMs: taskEnd,
    completionTimeMs: taskStart !== null && taskEnd !== null ? Math.max(0, taskEnd - taskStart) : null,
    clickCount: taskEvents.filter((event) => event.eventType === "click").length,
    misclickCount: taskEvents.filter((event) => event.eventType === "misclick").length,
    seatSelectionCount: taskEvents.filter((event) => event.eventType === "seat_select").length,
    carriageChangeCount: taskEvents.filter((event) => event.eventType === "car_change").length,
    roughTapCount: taskEvents.filter((event) => event.eventType === "rough_tap").length,
    pageTransitionCount: taskEvents.filter((event) => event.eventType === "page_view").length,
  };
}
