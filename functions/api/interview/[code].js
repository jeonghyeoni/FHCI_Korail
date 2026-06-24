import { INTERVIEW_DATA_BY_CODE } from "../../_interviewData.js";

const RESPONSE_HEADERS = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Cache-Control": "no-store",
};

function jsonResponse(data, init = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      ...RESPONSE_HEADERS,
      ...(init.headers || {}),
    },
  });
}

export async function onRequestGet({ params }) {
  const code = String(params.code || "").trim();
  const data = INTERVIEW_DATA_BY_CODE[code];

  if (!data) {
    return jsonResponse({ ok: false, error: "invalid_interview_code" }, { status: 404 });
  }

  return jsonResponse({ ok: true, interview: data });
}
