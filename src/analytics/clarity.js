export function setClarityExperimentContext({ participantId, variant, taskId, mode, isTestMode }) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") {
    return;
  }

  const clarityMode = mode || (isTestMode ? "test" : "production");

  window.clarity("set", "mode", clarityMode);
  window.clarity("set", "variant", variant);
  window.clarity("set", "participantId", participantId);
  window.clarity("set", "taskId", taskId);
}
