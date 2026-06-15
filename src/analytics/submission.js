import { formatKstTimestampText, toKstISOString, toKstTimestampText } from "../utils/time.js";

const PENDING_SUBMISSIONS_KEY = "pendingSubmission";
const SUBMITTED_PREFIX = "fhci_submitted";

const inFlightSubmissions = new Map();

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function getEndpoint() {
  return (import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL || "").trim();
}

function getSubmissionId(payload) {
  const submissionType = payload.submissionType || "task";
  return [submissionType, payload.participantId, payload.variant, payload.taskId].join(":");
}

function isSurveyPayload(payload) {
  return (payload.submissionType || "task") === "survey";
}

function getSubmittedKey(payload) {
  return `${SUBMITTED_PREFIX}:${getSubmissionId(payload)}`;
}

function isSubmitted(payload) {
  return false;
}

function markSubmitted(payload) {
  // Google Apps Script performs the authoritative duplicate check.
  // With no-cors requests the client cannot know whether the row was actually written,
  // so local "already submitted" flags can permanently hide missing rows.
}

function loadPendingSubmissions() {
  const pending = safeParse(localStorage.getItem(PENDING_SUBMISSIONS_KEY), []);
  return Array.isArray(pending) ? pending : [pending].filter(Boolean);
}

function savePendingSubmissions(items) {
  if (!items.length) {
    localStorage.removeItem(PENDING_SUBMISSIONS_KEY);
    return;
  }

  localStorage.setItem(PENDING_SUBMISSIONS_KEY, JSON.stringify(items));
}

function savePendingSubmission(payload) {
  const submissionId = getSubmissionId(payload);
  const pending = loadPendingSubmissions().filter((item) => getSubmissionId(item) !== submissionId);
  pending.push(payload);
  savePendingSubmissions(pending);
}

function removePendingSubmission(payload) {
  const submissionId = getSubmissionId(payload);
  const pending = loadPendingSubmissions().filter((item) => getSubmissionId(item) !== submissionId);
  savePendingSubmissions(pending);
}

async function postPayload(payload, { savePendingOnFailure = false, keepalive = false } = {}) {
  const endpoint = getEndpoint();
  const submissionId = getSubmissionId(payload);

  if (isSubmitted(payload)) {
    removePendingSubmission(payload);
    return { status: "success", message: "already_submitted" };
  }

  if (!endpoint) {
    console.warn("VITE_GOOGLE_SHEET_WEBAPP_URL is empty. Experiment data was not submitted.");
    return { status: "missing_endpoint" };
  }

  if (inFlightSubmissions.has(submissionId)) {
    return inFlightSubmissions.get(submissionId);
  }

  const submissionPromise = (async () => {
    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        keepalive,
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      markSubmitted(payload);
      removePendingSubmission(payload);
      return { status: "success" };
    } catch (error) {
      if (savePendingOnFailure) {
        savePendingSubmission(payload);
      }

      console.warn("Experiment data submission failed.", error);
      return { status: "failed", error };
    } finally {
      inFlightSubmissions.delete(submissionId);
    }
  })();

  inFlightSubmissions.set(submissionId, submissionPromise);
  return submissionPromise;
}

async function retryPendingSubmissions() {
  const pending = loadPendingSubmissions();
  let hadFailure = false;

  for (const payload of pending) {
    const result = await postPayload(payload, { savePendingOnFailure: true });
    if (result.status === "missing_endpoint") return result;
    if (result.status === "failed") hadFailure = true;
  }

  return hadFailure ? { status: "failed" } : { status: "success" };
}

export function buildSubmissionPayload({ summary, state, eventLogs, surveyAnswers = null, surveyResponses = [] }) {
  const participantId = summary?.participantId ?? state.participantId;
  const variant = summary?.variant ?? state.variant;
  const taskId = summary?.taskId ?? state.taskId;
  const selectedSeat = summary?.selectedSeat ?? state.selectedSeat ?? null;
  const startedAt = summary?.startedAt ?? summary?.taskStartTime ?? state.taskStartTime ?? null;
  const completedAt = summary?.completedAt ?? summary?.taskEndTime ?? state.taskEndTime ?? null;
  const identityLogs = eventLogs
    .filter((event) =>
      event.participantId === participantId &&
      event.variant === variant &&
      event.taskId === taskId
    )
    .map((event) => ({
      ...event,
      timestamp: formatKstTimestampText(event.timestamp),
    }));

  return {
    submissionType: "task",
    participantId,
    variant,
    taskId,
    taskSuccess: Boolean(summary?.taskSuccess ?? summary?.success ?? state.success),
    selectedSeat,
    selectedCar: summary?.selectedCar ?? selectedSeat?.carriageNo ?? state.currentCarriage ?? null,
    completionTimeMs: summary?.completionTimeMs ?? null,
    clickCount: summary?.clickCount ?? 0,
    misclickCount: summary?.misclickCount ?? 0,
    roughTapCount: summary?.roughTapCount ?? 0,
    pageTransitionCount: summary?.pageTransitionCount ?? 0,
    carriageChangeCount: summary?.carriageChangeCount ?? 0,
    seatSelectionCount: summary?.seatSelectionCount ?? 0,
    startedAt: formatKstTimestampText(startedAt),
    completedAt: formatKstTimestampText(completedAt),
    receivedAt: toKstTimestampText(),
    surveyAnswers,
    surveyResponses,
    eventLogs: identityLogs,
  };
}

function buildTaskSummaryBackupPayload(payload) {
  return {
    ...payload,
    submissionType: "task_backup",
    eventLogs: [],
    backupOnly: true,
  };
}

export function buildSurveySubmissionPayload({ summary, state, surveyAnswers = {}, surveyResponses = [], identity = null }) {
  const participantId = summary?.participantId ?? state.participantId;
  const variant = identity?.variant ?? summary?.variant ?? state.variant;
  const taskId = identity?.taskId ?? summary?.taskId ?? state.taskId;
  const keySuffix = identity?.keySuffix ?? "survey";

  return {
    submissionType: "survey",
    submissionVersion: "survey-v2",
    submissionKey: [participantId, variant, taskId, keySuffix].join(":"),
    participantId,
    variant,
    taskId,
    submittedAt: toKstISOString(),
    receivedAt: toKstTimestampText(),
    surveyAnswers,
    surveyResponses,
  };
}

export async function submitExperimentData(payload) {
  const pendingResult = await retryPendingSubmissions();

  if (pendingResult.status === "missing_endpoint") {
    return pendingResult;
  }

  if (pendingResult.status === "failed") {
    return pendingResult;
  }

  if (isSubmitted(payload)) {
    return { status: "success", message: "already_submitted" };
  }

  const result = await postPayload(payload, { savePendingOnFailure: true });

  if (result.status === "success" || result.status === "failed") {
    const backupResult = await postPayload(buildTaskSummaryBackupPayload(payload), {
      savePendingOnFailure: true,
      keepalive: true,
    });

    if (result.status === "failed" && backupResult.status === "success") {
      return { status: "success", message: "summary_backup_submitted" };
    }
  }

  return result;
}

export async function submitSurveyData(payload) {
  return postPayload(payload, { savePendingOnFailure: true, keepalive: true });
}
