/* Signal Desk validation: reject unsafe or unusable submissions before network work begins. */
export const MAX_TEXT_CHARACTERS = 20000;
export const MAX_URL_CHARACTERS = 2048;
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
export const DOCUMENT_ACCEPT = ".txt,text/plain";

export function validateSubmissionInput({ mode, value = "", file = null }) {
  if (mode === "document" && !file) return "Choose a document before analysing it.";
  if (mode !== "document" && !value.trim()) return mode === "url" ? "Paste an article URL to continue." : "Paste at least one paragraph to continue.";

  if (mode === "url") {
    if (value.trim().length > MAX_URL_CHARACTERS) return `Keep the URL under ${MAX_URL_CHARACTERS.toLocaleString()} characters.`;
    try {
      const parsed = new URL(value.trim());
      if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("invalid");
    } catch {
      return "Use a complete public URL beginning with https://.";
    }
  }

  if (mode === "text") {
    if (value.length > MAX_TEXT_CHARACTERS) return `Keep pasted text under ${MAX_TEXT_CHARACTERS.toLocaleString()} characters.`;
    if (value.trim().length < 80) return "Add a little more context—at least 80 characters helps the model read the claim.";
  }

  return "";
}

export function validateTextDocument(file) {
  if (!file) return "Choose a document before analysing it.";
  if (file.type !== "text/plain" || !/\.txt$/i.test(file.name)) return "That file type is not supported. Choose a plain TXT file.";
  if (file.size > MAX_DOCUMENT_BYTES) return "This file is larger than 10 MB. Choose a smaller classroom example.";
  return "";
}
