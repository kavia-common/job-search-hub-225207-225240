# Job Search Frontend (Royal Purple)

Elegant React frontend scaffold for a job search platform.

## Highlights
- Royal Purple theme (primary #8B5CF6, secondary #6B7280)
- Left Sidebar filters, center Job list, top NavBar
- Job details drawer with save/apply placeholders
- Routing: `/`, `/alerts`, `/applications`, `/saved`
- Centralized API client using env vars, mock fallback

## Getting Started
- Install: `npm install`
- Run: `npm start`
- Test: `npm test`
- Build: `npm run build`

## Environment
Copy `.env.example` to `.env` and set:
- `REACT_APP_API_BASE` (or `REACT_APP_BACKEND_URL`) for real API
- `REACT_APP_FEATURE_FLAGS` as JSON string (e.g., {"betaUI": true})
- `REACT_APP_EXPERIMENTS_ENABLED` toggle

No secrets are committed. All configuration uses environment variables.

## Structure
- `src/services/apiClient.js` — Env-driven API client with mock
- `src/context/AppContext.js` — Filters and saved jobs state
- `src/components/*` — NavBar, SidebarFilters, JobList, JobDetailsDrawer
- `src/pages/*` — Home, Alerts, Applications, Saved
- `src/theme.css` — Royal Purple theme

## Security
- No hardcoded URLs/keys
- Search inputs sanitized client-side before use
- Future: validate/sanitize on server as source of truth

See TESTING_NOTES.md for recommended tests.
