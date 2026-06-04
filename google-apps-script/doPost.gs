const SPREADSHEET_ID = "1NyXaqg6f94t8DClS15Z9u1sDrFluS5csosNxX7sjFK4";
const SUMMARY_SHEET_NAME = "TaskSummary";
const EVENT_LOG_SHEET_NAME = "EventLogs";

const SUMMARY_HEADERS = [
  "submissionKey",
  "participantId",
  "variant",
  "taskId",
  "taskSuccess",
  "selectedSeat",
  "selectedCar",
  "completionTimeMs",
  "clickCount",
  "misclickCount",
  "roughTapCount",
  "pageTransitionCount",
  "carriageChangeCount",
  "seatSelectionCount",
  "startedAt",
  "completedAt",
  "receivedAt",
];

const EVENT_LOG_HEADERS = [
  "submissionKey",
  "participantId",
  "variant",
  "taskId",
  "timestamp",
  "pageName",
  "eventType",
  "eventLabel",
  "xCoordinate",
  "yCoordinate",
  "route",
  "seatId",
  "carriageNo",
  "metadata",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const submissionKey = makeSubmissionKey_(payload);
    const spreadsheet = getSpreadsheet_();
    const summarySheet = ensureSheet_(spreadsheet, SUMMARY_SHEET_NAME, SUMMARY_HEADERS);
    const eventLogSheet = ensureSheet_(spreadsheet, EVENT_LOG_SHEET_NAME, EVENT_LOG_HEADERS);

    if (hasSubmission_(summarySheet, submissionKey)) {
      return jsonResponse_({ ok: true, duplicate: true, submissionKey });
    }

    summarySheet.appendRow([
      submissionKey,
      payload.participantId || "",
      payload.variant || "",
      payload.taskId || "",
      Boolean(payload.taskSuccess),
      JSON.stringify(payload.selectedSeat || null),
      payload.selectedCar || "",
      payload.completionTimeMs ?? "",
      payload.clickCount ?? 0,
      payload.misclickCount ?? 0,
      payload.roughTapCount ?? 0,
      payload.pageTransitionCount ?? 0,
      payload.carriageChangeCount ?? 0,
      payload.seatSelectionCount ?? 0,
      payload.startedAt || "",
      payload.completedAt || "",
      new Date().toISOString(),
    ]);

    appendEventLogs_(eventLogSheet, submissionKey, payload.eventLogs || []);

    return jsonResponse_({ ok: true, duplicate: false, submissionKey });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  return SpreadsheetApp.getActiveSpreadsheet();
}

function ensureSheet_(spreadsheet, sheetName, headers) {
  const sheet = spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }

  return sheet;
}

function hasSubmission_(sheet, submissionKey) {
  const match = sheet.createTextFinder(submissionKey).matchEntireCell(true).findNext();
  return Boolean(match);
}

function appendEventLogs_(sheet, submissionKey, eventLogs) {
  if (!eventLogs.length) return;

  const rows = eventLogs.map((event) => [
    submissionKey,
    event.participantId || "",
    event.variant || "",
    event.taskId || "",
    event.timestamp || "",
    event.pageName || "",
    event.eventType || "",
    event.eventLabel || "",
    event.xCoordinate ?? "",
    event.yCoordinate ?? "",
    event.route || "",
    event.seatId || "",
    event.carriageNo || "",
    JSON.stringify(event.metadata || {}),
  ]);

  sheet.getRange(sheet.getLastRow() + 1, 1, rows.length, EVENT_LOG_HEADERS.length).setValues(rows);
}

function makeSubmissionKey_(payload) {
  return [payload.participantId, payload.variant, payload.taskId].join(":");
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
