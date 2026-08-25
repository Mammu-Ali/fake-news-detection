# FastAPI Security Handoff

This document records security work that cannot be enforced by the static React client. The browser checks improve user feedback, but the FastAPI service remains the security boundary.

## URL analysis

For `POST /api/v1/analyses/url`, validate the URL server-side before any outbound request. Allow only `http` and `https`, reject credentials in URLs, restrict ports, resolve DNS and reject loopback, link-local, private, reserved, and cloud-metadata address ranges, and re-check the resolved destination after redirects. Enforce redirect count, connection timeout, read timeout, response-size limit, content-type allowlist, and extraction time budget. Do not return arbitrary fetched HTML to the browser.

## Document analysis

For `POST /api/v1/analyses/document`, enforce request-body and file-size limits while streaming. Validate the extension, declared MIME type, and file signature; never trust browser-provided MIME metadata. For the current frontend MVP, accept plain text only. If PDF or DOCX support is re-enabled, use hardened parsers, parser resource limits, malware scanning where required, temporary private storage, and deletion after extraction or a short expiry. Treat filenames as untrusted display data.

## Text and model-cost limits

Enforce a maximum request body, maximum normalized text length, concurrency limit, timeout, and anonymous rate limit in FastAPI. Do not rely on the frontend `maxLength` attribute. Apply separate limits and cost controls for text, URL fetching, and documents. Never log raw article text, fetched HTML, uploaded bytes, prompts, or provider credentials.

## Browser/API boundary

Serve the API over HTTPS in non-local environments. Configure an explicit CORS origin allowlist rather than `*`, and do not allow credentials unless the authentication and CSRF policy requires them. Treat `VITE_ANALYSIS_API_URL` as public routing configuration, not a secret. Prefer same-origin routing through a reverse proxy in production.

## Response handling

Return the documented stable response envelope and error codes. Validate provider output server-side before returning labels, confidence, signals, limitations, model metadata, and modality claims. Confidence must not be described as calibrated unless evaluation supports that claim.

## Required tests before enabling more formats

Add integration and security tests for private-IP URL targets, DNS rebinding defenses, redirect escapes, oversized responses, unsupported content types, forged MIME types, malformed PDFs/DOCX files, decompression bombs, oversized text, repeated anonymous requests, CORS origins, and sanitized logs.
