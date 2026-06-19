const RESPONSE_HEADERS = {
  "Content-Type": "application/json;charset=utf-8",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
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

function getGoogleSheetEndpoint(env) {
  return (env.GOOGLE_SHEET_WEBAPP_URL || env.VITE_GOOGLE_SHEET_WEBAPP_URL || "").trim();
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: RESPONSE_HEADERS,
  });
}

export async function onRequestPost({ request, env }) {
  const endpoint = getGoogleSheetEndpoint(env);

  if (!endpoint) {
    return jsonResponse({ ok: false, error: "GOOGLE_SHEET_WEBAPP_URL is not configured." }, { status: 500 });
  }

  const body = await request.text();

  try {
    const upstreamResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body,
    });
    const upstreamText = await upstreamResponse.text();
    let upstreamData = null;

    try {
      upstreamData = upstreamText ? JSON.parse(upstreamText) : null;
    } catch {
      upstreamData = null;
    }

    if (!upstreamResponse.ok || upstreamData?.ok !== true) {
      return jsonResponse({
        ok: false,
        error: upstreamData?.error || `Google Apps Script did not confirm the write. HTTP ${upstreamResponse.status}`,
        upstreamStatus: upstreamResponse.status,
      }, { status: 502 });
    }

    return jsonResponse(upstreamData);
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, { status: 502 });
  }
}
