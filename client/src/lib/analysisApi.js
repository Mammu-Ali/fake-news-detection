/* Signal Desk style: API data should preserve the calm, inspectable readout—prediction, confidence, signals, and limitations stay separate. */

const API_BASE_URL = (import.meta.env.VITE_ANALYSIS_API_URL || "/api/v1").replace(/\/$/, "");
const REQUEST_TIMEOUT_MS = 30_000;

export class AnalysisApiError extends Error {
  constructor(message, code = "ANALYSIS_REQUEST_FAILED", status = 0) {
    super(message);
    this.name = "AnalysisApiError";
    this.code = code;
    this.status = status;
  }
}

function getErrorMessage(payload, fallback) {
  if (typeof payload?.detail === "string") return payload.detail;
  if (typeof payload?.message === "string") return payload.message;
  if (typeof payload?.error?.message === "string") return payload.error.message;
  return fallback;
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const externalSignal = options.signal;
  const abortFromCaller = () => controller.abort();

  if (externalSignal) {
    if (externalSignal.aborted) controller.abort();
    else externalSignal.addEventListener("abort", abortFromCaller, { once: true });
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(options.headers || {}),
      },
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json") ? await response.json() : null;

    if (!response.ok) {
      throw new AnalysisApiError(
        getErrorMessage(payload, "The analysis service could not complete this request."),
        payload?.error?.code || payload?.code || "ANALYSIS_REQUEST_FAILED",
        response.status,
      );
    }

    if (!payload || typeof payload !== "object") {
      throw new AnalysisApiError("The analysis service returned an unreadable response.", "MALFORMED_RESPONSE", response.status);
    }

    return payload;
  } catch (error) {
    if (error instanceof AnalysisApiError) throw error;
    if (error?.name === "AbortError") {
      throw new AnalysisApiError("The analysis took too long to respond. Try a shorter example or retry.", "REQUEST_TIMEOUT");
    }
    throw new AnalysisApiError("The analysis service is unavailable. Check the API connection and try again.", "NETWORK_ERROR");
  } finally {
    window.clearTimeout(timeoutId);
    externalSignal?.removeEventListener("abort", abortFromCaller);
  }
}

export function analyzeText(text, options = {}) {
  return request("/analyses/text", {
    method: "POST",
    body: JSON.stringify({ text, language: "en" }),
    signal: options.signal,
  });
}

export function analyzeUrl(url, options = {}) {
  return request("/analyses/url", {
    method: "POST",
    body: JSON.stringify({ url, language: "en" }),
    signal: options.signal,
  });
}

export function analyzeDocument(file, options = {}) {
  const formData = new FormData();
  formData.append("file", file);
  return request("/analyses/document", {
    method: "POST",
    body: formData,
    signal: options.signal,
  });
}

export { API_BASE_URL, REQUEST_TIMEOUT_MS };
