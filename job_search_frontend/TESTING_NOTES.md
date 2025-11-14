Recommended tests (TODO):
- App renders and routes exist for '/', '/alerts', '/applications', '/saved'
- SidebarFilters updates context and triggers onApply
- apiClient uses env var REACT_APP_API_BASE; returns mock when unset
- JobDetailsDrawer opens/closes and renders fields
- SavedJobs context add/remove behaviors
ESLint: configured via eslint.config.mjs; ensure no unused vars.
