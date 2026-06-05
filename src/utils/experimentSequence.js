export const PARTICIPANT_ID_KEY = "fhci_participant_id";
export const SEQUENCE_INDEX_KEY = "fhci_sequence_index";

export const EXPERIMENT_SEQUENCE = [
  { taskId: "1", variant: "A" },
  { taskId: "1", variant: "B" },
  { taskId: "2", variant: "A" },
  { taskId: "2", variant: "B" },
  { taskId: "3", variant: "A" },
  { taskId: "3", variant: "B" },
];

function safeLocalStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures so the experiment can still run.
  }
}

function randomBase36(length) {
  const bytes = new Uint8Array(length);

  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  return Array.from(bytes, (byte) => (byte % 36).toString(36)).join("").toUpperCase();
}

export function isValidParticipantId(participantId) {
  return /^P\d{3,}$/i.test(participantId) ||
    /^P[A-Z0-9]{8}$/i.test(participantId);
}

export function generateParticipantId() {
  return `P${randomBase36(8)}`;
}

export function getOrCreateParticipantId(explicitParticipantId = "") {
  if (explicitParticipantId && isValidParticipantId(explicitParticipantId)) {
    safeLocalStorageSet(PARTICIPANT_ID_KEY, explicitParticipantId);
    return explicitParticipantId;
  }

  const storedParticipantId = safeLocalStorageGet(PARTICIPANT_ID_KEY);
  if (storedParticipantId && isValidParticipantId(storedParticipantId)) {
    return storedParticipantId;
  }

  const generatedParticipantId = generateParticipantId();
  safeLocalStorageSet(PARTICIPANT_ID_KEY, generatedParticipantId);
  return generatedParticipantId;
}

export function getStoredSequenceIndex() {
  const rawIndex = Number(safeLocalStorageGet(SEQUENCE_INDEX_KEY));
  if (!Number.isFinite(rawIndex) || rawIndex < 0) return 0;
  return Math.min(rawIndex, EXPERIMENT_SEQUENCE.length);
}

export function getCurrentSequenceCondition() {
  const index = getStoredSequenceIndex();
  if (index >= EXPERIMENT_SEQUENCE.length) {
    return EXPERIMENT_SEQUENCE[EXPERIMENT_SEQUENCE.length - 1];
  }

  return EXPERIMENT_SEQUENCE[index];
}

export function isSequenceComplete() {
  return getStoredSequenceIndex() >= EXPERIMENT_SEQUENCE.length;
}

export function findConditionIndex(taskId, variant) {
  return EXPERIMENT_SEQUENCE.findIndex((item) => item.taskId === String(taskId) && item.variant === variant);
}

export function getNextCondition(taskId, variant) {
  const currentIndex = findConditionIndex(taskId, variant);
  if (currentIndex < 0 || currentIndex >= EXPERIMENT_SEQUENCE.length - 1) {
    return null;
  }

  return EXPERIMENT_SEQUENCE[currentIndex + 1];
}

export function markConditionComplete(taskId, variant) {
  const currentIndex = findConditionIndex(taskId, variant);
  if (currentIndex < 0) return;

  const nextIndex = currentIndex + 1;
  const storedIndex = getStoredSequenceIndex();
  safeLocalStorageSet(SEQUENCE_INDEX_KEY, String(Math.max(storedIndex, nextIndex)));
}

export function buildConditionUrl(condition, participantId) {
  const params = new URLSearchParams({
    variant: condition.variant,
    task: condition.taskId,
    pid: participantId,
  });

  return `/?${params.toString()}`;
}
