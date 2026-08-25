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

- [ ] Review frontend and API client for confirmed bugs.
- [ ] Review security boundaries and deployment/configuration risks.
- [ ] Review performance, architecture, and duplicated logic.
- [ ] Deliver a senior-engineering review with Problem, Why, and Fix for each issue.

- [x] Fix stale error and retry state after input or file changes.
- [x] Add component unmount cleanup for pending requests and loading timers.
- [x] Add client-side maximum payload limits and make the limit explicit to users.
- [x] Align upload format choices with the currently approved backend capability.
- [x] Document FastAPI-only SSRF, upload, rate-limit, and CORS fixes that cannot be enforced in the static client.
- [x] Run regression checks and save a checkpoint for the fixes.

- [x] Map happy path, invalid input, edge cases, errors, authentication, and API/database failures to unit, integration, and end-to-end levels.
- [x] Add executable unit tests for validation and API-client response/error handling.
- [x] Add the project test command and minimal test configuration.
- [x] Document backend authentication and database failure tests that cannot run without the FastAPI service.
- [x] Run the implemented tests and save a checkpoint.

- [x] Inspect Git status, branch, remotes, and repository visibility state.
- [x] Prepare a focused commit for the latest project state.
- [x] Create or configure a private GitHub remote if needed.
- [x] Push and verify the remote branch and commit.

- [x] Review implemented project files and architecture/API documents for README facts.
- [x] Write comprehensive architecture, setup, API, testing, security, deployment, and limitations documentation.
- [x] Verify README commands and examples against the current project.
- [ ] Commit and push the README update.

- [x] Inspect current image URLs and available generated asset files without reopening the attached screenshot.
- [x] Add local-safe image asset references for the existing brand and editorial artwork.
- [x] Verify image requests, responsive rendering, and the production build.
- [x] Save a checkpoint for the local image fix.
