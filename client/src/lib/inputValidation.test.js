import { describe, expect, it } from "vitest";
import {
  MAX_DOCUMENT_BYTES,
  MAX_TEXT_CHARACTERS,
  MAX_URL_CHARACTERS,
  validateSubmissionInput,
  validateTextDocument,
} from "./inputValidation";

const validText = "A classroom article with enough context to test the analysis submission boundary safely.";

function makeFile({ name = "article.txt", type = "text/plain", size = 128 } = {}) {
  return { name, type, size };
}

describe("validateSubmissionInput", () => {
  it("accepts a sufficiently long text submission", () => {
    expect(validateSubmissionInput({ mode: "text", value: validText })).toBe("");
  });

  it("rejects empty and too-short text", () => {
    expect(validateSubmissionInput({ mode: "text", value: "   " })).toMatch(/paragraph/);
    expect(validateSubmissionInput({ mode: "text", value: "a".repeat(79) })).toMatch(/80 characters/);
  });

  it("accepts exactly the configured maximum text length and rejects larger programmatic input", () => {
    expect(validateSubmissionInput({ mode: "text", value: "a".repeat(MAX_TEXT_CHARACTERS) })).toBe("");
    expect(validateSubmissionInput({ mode: "text", value: "a".repeat(MAX_TEXT_CHARACTERS + 1) })).toMatch(/20,000/);
  });

  it("accepts HTTP(S) URLs and rejects unsupported or oversized URLs", () => {
    expect(validateSubmissionInput({ mode: "url", value: "https://example.com/article" })).toBe("");
    expect(validateSubmissionInput({ mode: "url", value: "javascript:alert(1)" })).toMatch(/complete public URL/);
    expect(validateSubmissionInput({ mode: "url", value: "example.com/article" })).toMatch(/complete public URL/);
    expect(validateSubmissionInput({ mode: "url", value: `https://example.com/${"a".repeat(MAX_URL_CHARACTERS)}` })).toMatch(/2,048/);
  });

  it("requires a document in document mode", () => {
    expect(validateSubmissionInput({ mode: "document", file: null })).toMatch(/Choose a document/);
    expect(validateSubmissionInput({ mode: "document", file: makeFile() })).toBe("");
  });
});

describe("validateTextDocument", () => {
  it("accepts a plain-text file within the size limit", () => {
    expect(validateTextDocument(makeFile({ size: MAX_DOCUMENT_BYTES }))).toBe("");
  });

  it("rejects forged or unsupported document types", () => {
    expect(validateTextDocument(makeFile({ name: "article.pdf", type: "text/plain" }))).toMatch(/plain TXT/);
    expect(validateTextDocument(makeFile({ name: "article.txt", type: "application/pdf" }))).toMatch(/plain TXT/);
  });

  it("rejects an oversized document", () => {
    expect(validateTextDocument(makeFile({ size: MAX_DOCUMENT_BYTES + 1 }))).toMatch(/10 MB/);
  });
});
