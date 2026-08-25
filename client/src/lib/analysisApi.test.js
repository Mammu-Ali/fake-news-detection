import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AnalysisApiError, analyzeDocument, analyzeText } from "./analysisApi";

const completeResponse = {
  analysis_id: "analysis-123",
  status: "complete",
  prediction: { label: "Fake", confidence: 0.78 },
  explanation: { type: "model_signals", signals: [] },
  modalities_analyzed: ["text"],
  limitations: ["Model prediction, not proof."],
  model: { name: "test-model", version: "1.0" },
};

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

describe("analysisApi", () => {
  beforeEach(() => {
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("returns a complete text analysis and sends the documented payload", async () => {
    fetch.mockResolvedValueOnce(jsonResponse(completeResponse));

    const result = await analyzeText("A sufficiently detailed classroom article.");

    expect(result).toEqual(completeResponse);
    const [url, options] = fetch.mock.calls[0];
    expect(url).toContain("/api/v1/analyses/text");
    expect(JSON.parse(options.body)).toEqual({
      text: "A sufficiently detailed classroom article.",
      language: "en",
    });
    expect(options.headers.Authorization).toBeUndefined();
  });

  it("sends document submissions as multipart form data", async () => {
    fetch.mockResolvedValueOnce(jsonResponse(completeResponse));
    const file = new File(["article text"], "article.txt", { type: "text/plain" });

    await analyzeDocument(file);

    const [url, options] = fetch.mock.calls[0];
    expect(url).toContain("/api/v1/analyses/document");
    expect(options.body).toBeInstanceOf(FormData);
    expect(options.body.get("file").name).toBe("article.txt");
    expect(options.headers["Content-Type"]).toBeUndefined();
  });

  it("maps structured server errors without exposing provider details", async () => {
    fetch.mockResolvedValueOnce(jsonResponse({ detail: "Rate limit exceeded" }, 429));

    await expect(analyzeText("A classroom article with enough content.")).rejects.toMatchObject({
      code: "ANALYSIS_REQUEST_FAILED",
      status: 429,
      message: "Rate limit exceeded",
    });
  });

  it("maps unavailable network failures to a retryable API error", async () => {
    fetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));

    await expect(analyzeText("A classroom article with enough content.")).rejects.toMatchObject({
      code: "NETWORK_ERROR",
      message: expect.stringContaining("unavailable"),
    });
  });

  it("maps an aborted request to a timeout error", async () => {
    vi.useFakeTimers();
    fetch.mockImplementationOnce((_url, { signal }) => new Promise((_, reject) => {
      signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" })));
    }));

    const pending = analyzeText("A classroom article with enough content.");
    const timeoutAssertion = expect(pending).rejects.toMatchObject({
      code: "REQUEST_TIMEOUT",
      message: expect.stringContaining("too long"),
    });
    await vi.advanceTimersByTimeAsync(30_000);
    await timeoutAssertion;
  });

  it("preserves the custom error type for client-side response validation failures", async () => {
    fetch.mockResolvedValueOnce(new Response("not-json", { status: 200, headers: { "content-type": "text/html" } }));

    await expect(analyzeText("A classroom article with enough content.")).rejects.toBeInstanceOf(AnalysisApiError);
  });
});
