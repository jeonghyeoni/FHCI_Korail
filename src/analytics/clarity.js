export function setClarityExperimentContext({ participantId, variant, taskId }) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") {
    return;
  }

  window.clarity("set", "variant", variant);
  window.clarity("set", "participantId", participantId);
  window.clarity("set", "taskId", taskId);
}
