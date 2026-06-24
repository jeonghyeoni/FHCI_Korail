import { formatKstTimestampText, toKstISOString, toKstTimestampText } from "../utils/time.js";

const PENDING_SUBMISSIONS_KEY = "pendingSubmission";
const SUBMITTED_PREFIX = "fhci_submitted";
const TASK_SUMMARY_BACKUP_QUEUE_KEY = "fhci_task_summary_backup_queue";
const TASK_SUMMARY_BACKUP_RETRY_INTERVAL_MS = 15000;
const TASK_SUMMARY_BACKUP_MAX_ITEMS = 24;

const inFlightSubmissions = new Map();
let summaryBackupFlushPromise = null;

function safeParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function parseTimeMs(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value === null || value === undefined || value === "") return null;

  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function resolveCompletionTimeMs({ summary, state, startedAt, completedAt }) {
  const explicitRaw = summary?.completionTimeMs;
  const explicit = Number(explicitRaw);
  if (explicitRaw !== null && explicitRaw !== undefined && explicitRaw !== "" && Number.isFinite(explicit)) {
    return explicit;
  }

  const start = parseTimeMs(summary?.taskStartEpochMs)
    ?? parseTimeMs(state.taskStartEpochMs)
    ?? parseTimeMs(startedAt);
  const end = parseTimeMs(summary?.taskEndEpochMs)
    ?? parseTimeMs(state.taskEndEpochMs)
    ?? parseTimeMs(completedAt);

  return start !== null && end !== null ? Math.max(0, end - start) : null;
}

function getEndpoint() {
  const explicitEndpoint = (import.meta.env.VITE_SUBMISSION_ENDPOINT || "").trim();

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1" || hostname === "";
    if (!isLocalhost) {
      if (explicitEndpoint && canReadSubmissionResponse(explicitEndpoint)) {
        return explicitEndpoint;
      }

      if (explicitEndpoint) {
        console.warn("Ignoring cross-origin VITE_SUBMISSION_ENDPOINT in production. Using /api/submit to verify writes.");
      }

      return "/api/submit";
    }
  }

  return explicitEndpoint || (import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL || "").trim();
}

function canReadSubmissionResponse(endpoint) {
  if (typeof window === "undefined") return false;

  try {
    return new URL(endpoint, window.location.origin).origin === window.location.origin;
  } catch {
    return false;
  }
}

function getSubmissionId(payload) {
  const submissionType = payload.submissionType || "task";
  return [submissionType, payload.participantId, payload.variant, payload.taskId].join(":");
}

function getTaskSubmissionKey(payload) {
  return payload.submissionKey || [payload.participantId, payload.variant, payload.taskId].join(":");
}

function isTaskLikePayload(payload) {
  const submissionType = payload.submissionType || "task";
  return submissionType === "task" || submissionType === "task_backup";
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

function loadTaskSummaryBackupQueue() {
  const queue = safeParse(localStorage.getItem(TASK_SUMMARY_BACKUP_QUEUE_KEY), []);
  return Array.isArray(queue) ? queue.filter((entry) => entry?.payload) : [];
}

function saveTaskSummaryBackupQueue(items) {
  const compacted = items.slice(-TASK_SUMMARY_BACKUP_MAX_ITEMS);

  if (!compacted.length) {
    localStorage.removeItem(TASK_SUMMARY_BACKUP_QUEUE_KEY);
    return;
  }

  localStorage.setItem(TASK_SUMMARY_BACKUP_QUEUE_KEY, JSON.stringify(compacted));
}

function buildQueueEntry(payload, existingEntry = null) {
  const now = toKstISOString();

  return {
    id: getTaskSubmissionKey(payload),
    queuedAt: existingEntry?.queuedAt || now,
    lastAttemptedAt: existingEntry?.lastAttemptedAt || null,
    attemptCount: existingEntry?.attemptCount || 0,
    payload,
  };
}

function upsertTaskSummaryBackup(payload) {
  if (!payload?.participantId || !payload?.variant || !payload?.taskId) return;

  const backupPayload = buildTaskSummaryBackupPayload(payload);
  const backupId = getTaskSubmissionKey(backupPayload);
  const queue = loadTaskSummaryBackupQueue();
  const existingEntry = queue.find((entry) => entry.id === backupId);
  const nextEntry = buildQueueEntry(backupPayload, existingEntry);
  const nextQueue = queue.filter((entry) => entry.id !== backupId);
  nextQueue.push(nextEntry);
  saveTaskSummaryBackupQueue(nextQueue);
}

function markTaskSummaryBackupAttempt(id) {
  const now = toKstISOString();
  const queue = loadTaskSummaryBackupQueue().map((entry) => (
    entry.id === id
      ? {
        ...entry,
        lastAttemptedAt: now,
        attemptCount: (entry.attemptCount || 0) + 1,
      }
      : entry
  ));
  saveTaskSummaryBackupQueue(queue);
}

function removeTaskSummaryBackup(payload) {
  const backupId = getTaskSubmissionKey(payload);
  const queue = loadTaskSummaryBackupQueue().filter((entry) => entry.id !== backupId);
  saveTaskSummaryBackupQueue(queue);
}

async function postPayload(payload, { savePendingOnFailure = false, keepalive = false } = {}) {
  const endpoint = getEndpoint();
  const submissionId = getSubmissionId(payload);
  const canReadResponse = canReadSubmissionResponse(endpoint);

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
      const response = await fetch(endpoint, {
        method: "POST",
        mode: canReadResponse ? "same-origin" : "no-cors",
        keepalive,
        headers: {
          "Content-Type": canReadResponse ? "application/json" : "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (canReadResponse) {
        const responseData = await response.json().catch(() => null);
        if (!response.ok || responseData?.ok === false) {
          throw new Error(responseData?.error || `Submission failed with HTTP ${response.status}`);
        }
      }

      markSubmitted(payload);
      removePendingSubmission(payload);
      if (canReadResponse && isTaskLikePayload(payload)) {
        removeTaskSummaryBackup(payload);
      }
      return { status: "success", confirmed: canReadResponse };
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
  const completionTimeMs = resolveCompletionTimeMs({ summary, state, startedAt, completedAt });
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
    completionTimeMs,
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

export function queueTaskSummaryBackup(payload) {
  upsertTaskSummaryBackup(payload);
}

function buildTaskSummaryBackupPayload(payload) {
  return {
    ...payload,
    submissionType: "task_backup",
    submissionKey: getTaskSubmissionKey(payload),
    eventLogs: [],
    backupOnly: true,
  };
}

export async function flushQueuedTaskSummaryBackups({ force = false, skipIds = [] } = {}) {
  const endpoint = getEndpoint();
  const skipIdSet = new Set(skipIds);

  if (!endpoint) {
    if (loadTaskSummaryBackupQueue().length) {
      console.warn("VITE_GOOGLE_SHEET_WEBAPP_URL is empty. Queued task summary backups were not submitted.");
    }
    return { status: "missing_endpoint" };
  }

  if (summaryBackupFlushPromise) {
    return summaryBackupFlushPromise;
  }

  summaryBackupFlushPromise = (async () => {
    const queue = loadTaskSummaryBackupQueue();
    let hadFailure = false;

    for (const entry of queue) {
      if (!entry?.payload || skipIdSet.has(entry.id)) continue;

      const lastAttemptTime = entry.lastAttemptedAt ? Date.parse(entry.lastAttemptedAt) : 0;
      if (!force && lastAttemptTime && Date.now() - lastAttemptTime < TASK_SUMMARY_BACKUP_RETRY_INTERVAL_MS) {
        continue;
      }

      markTaskSummaryBackupAttempt(entry.id);
      const result = await postPayload(entry.payload, { savePendingOnFailure: true, keepalive: true });

      if (result.status === "missing_endpoint") return result;
      if (result.status === "failed") hadFailure = true;
    }

    return hadFailure ? { status: "failed" } : { status: "success" };
  })();

  try {
    return await summaryBackupFlushPromise;
  } finally {
    summaryBackupFlushPromise = null;
  }
}

export function sendQueuedTaskSummaryBackupsBeacon() {
  const endpoint = getEndpoint();

  if (!endpoint || typeof navigator === "undefined" || typeof navigator.sendBeacon !== "function") {
    return false;
  }

  const queue = loadTaskSummaryBackupQueue();
  if (!queue.length) return false;

  queue.forEach((entry) => {
    if (!entry?.payload) return;
    const body = new Blob([JSON.stringify(entry.payload)], { type: "text/plain;charset=utf-8" });
    navigator.sendBeacon(endpoint, body);
    markTaskSummaryBackupAttempt(entry.id);
  });

  return true;
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

export function buildInterviewSubmissionPayload({ interview, answers }) {
  const receivedAt = toKstTimestampText();
  const interviewResponses = [
    ...(interview.commonQuestions || []),
    ...(interview.customQuestions || []),
  ].map((question, index) => ({
    questionGroup: question.group || "인터뷰 질문",
    questionNumber: question.number || String(index + 1),
    questionLabel: question.label || "",
    answer: answers[question.id] || "",
  }));

  return {
    submissionType: "interview",
    submissionKey: ["interview", interview.intervieweeLabel, interview.interviewCode].join(":"),
    intervieweeLabel: interview.intervieweeLabel,
    participantId: interview.participantId,
    interviewCode: interview.interviewCode,
    clarityUrl: interview.clarityUrl || "",
    receivedAt,
    interviewResponses,
  };
}

export async function submitExperimentData(payload) {
  queueTaskSummaryBackup(payload);
  const currentBackupId = getTaskSubmissionKey(payload);
  await flushQueuedTaskSummaryBackups({ skipIds: [currentBackupId] });

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

  if (result.status === "success" && result.confirmed) {
    return result;
  }

  if (result.status === "success" || result.status === "failed") {
    const backupPayload = buildTaskSummaryBackupPayload(payload);
    const backupResult = await postPayload(backupPayload, {
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

export async function submitInterviewData(payload) {
  return postPayload(payload, { savePendingOnFailure: true });
}
