export const SESSION_KEY = "fhci_experiment_session";
export const EVENTS_KEY = "fhci_experiment_events";
export const SUMMARY_KEY = "fhci_experiment_summary";

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function loadEvents() {
  return safeParse(localStorage.getItem(EVENTS_KEY), []);
}

export function appendEvent(event) {
  const events = loadEvents();
  events.push(event);
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  return event;
}

export function saveSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function loadSummary() {
  return safeParse(localStorage.getItem(SUMMARY_KEY), null);
}

export function saveSummary(summary) {
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
