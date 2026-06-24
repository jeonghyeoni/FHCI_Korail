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

export function setClarityInterviewContext({ participantId, interviewCode, intervieweeLabel, isCompletePage = false }) {
  if (typeof window === "undefined" || typeof window.clarity !== "function") {
    return;
  }

  window.clarity("set", "mode", "interview");
  window.clarity("set", "pageType", isCompletePage ? "interview_complete" : "interview");
  window.clarity("set", "participantId", participantId);
  window.clarity("set", "interviewCode", interviewCode);
  window.clarity("set", "intervieweeLabel", intervieweeLabel);
}
