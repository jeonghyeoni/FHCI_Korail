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

export function buildSummary(session, events = loadEvents()) {
  const taskStart = session.taskStartTime ? Date.parse(session.taskStartTime) : null;
  const taskEnd = session.taskEndTime ? Date.parse(session.taskEndTime) : null;
  const taskEvents = taskStart
    ? events.filter((event) => Date.parse(event.timestamp) >= taskStart)
    : events;

  return {
    participantId: session.participantId,
    variant: session.variant,
    taskId: session.taskId,
    selectedSeat: session.selectedSeat,
    selectedCar: session.selectedSeat?.carriageNo ?? session.currentCarriage ?? null,
    taskSuccess: Boolean(session.success),
    success: Boolean(session.success),
    startedAt: session.taskStartTime,
    completedAt: session.taskEndTime,
    taskStartTime: session.taskStartTime,
    taskEndTime: session.taskEndTime,
    completionTimeMs: taskStart && taskEnd ? taskEnd - taskStart : null,
    clickCount: taskEvents.filter((event) => event.eventType === "click").length,
    misclickCount: taskEvents.filter((event) => event.eventType === "misclick").length,
    seatSelectionCount: taskEvents.filter((event) => event.eventType === "seat_select").length,
    carriageChangeCount: taskEvents.filter((event) => event.eventType === "car_change").length,
    roughTapCount: taskEvents.filter((event) => event.eventType === "rough_tap").length,
    pageTransitionCount: taskEvents.filter((event) => event.eventType === "page_view").length,
  };
}
