# Todo

- [x] Inventory all frontend TypeScript/TSX source files and TypeScript-specific build configuration.
- [x] Convert frontend `.tsx` source files to `.jsx` without changing behavior or design.
- [x] Convert frontend utility/context/hook files that require JavaScript equivalents.
- [x] Update entry points, imports, Vite configuration, and package scripts for JavaScript.
- [x] Remove TypeScript-only configuration and dependencies where safe.
- [x] Run the JavaScript build and verify the main user flows and responsive layout.
- [ ] Save a new checkpoint with the JavaScript-converted project.

- [x] Add an environment-configurable FastAPI base URL and typed-by-convention JavaScript API client.
- [x] Connect text, URL, and document submissions to the documented analysis endpoints.
- [x] Handle loading, timeout, API errors, unavailable responses, and malformed responses.
- [x] Add loading animations that communicate extraction and model analysis progress.
- [x] Run build checks and verify the connected frontend visually.
- [ ] Save a checkpoint for the FastAPI-connected frontend.

- [x] Add a user-facing retry button to FastAPI timeout and connection-failure states.
- [x] Preserve submitted input and selected mode when retrying.
- [x] Verify retry returns to loading and handles repeated failures safely.
- [ ] Save a checkpoint for the improved error state.
