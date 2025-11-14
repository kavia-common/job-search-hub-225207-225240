const BASE = process.env.REACT_APP_API_BASE || process.env.REACT_APP_BACKEND_URL || '';
const LOG_LEVEL = process.env.REACT_APP_LOG_LEVEL || 'info';
const FEATURE_FLAGS_RAW = process.env.REACT_APP_FEATURE_FLAGS || '{}';

let parsedFlags = {};
try {
  parsedFlags = JSON.parse(FEATURE_FLAGS_RAW);
} catch {
  parsedFlags = {};
}

/**
 * PUBLIC_INTERFACE
 * createApiClient
 * Creates a minimal API client wrapper that reads env-configured base URL.
 * Provides mock fallback when BASE is not set.
 *
 * @returns {{searchJobs: (filters: object) => Promise<{jobs: any[], total: number}>,
 *            getJobById: (id: string) => Promise<any>,
 *            flags: Record<string, boolean>}}
 */
export function createApiClient() {
  const flags = {
    experimentsEnabled: (process.env.REACT_APP_EXPERIMENTS_ENABLED || 'false') === 'true',
    ...parsedFlags
  };

  const isMock = !BASE;

  const safeFetch = async (path, opts = {}) => {
    const url = `${BASE}${path}`;
    if (!BASE) {
      if (LOG_LEVEL !== 'silent') {
        // eslint-disable-next-line no-console
        console.warn('[API] No REACT_APP_API_BASE set. Using mock responses.');
      }
      throw new Error('NO_BASE');
    }
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
      credentials: 'include',
      ...opts
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API_ERROR ${res.status}: ${text}`);
    }
    return res.json();
  };

  // Simple sanitizer for free-text input to reduce risk of injection in logs/queries.
  const sanitize = (s) => (typeof s === 'string' ? s.replace(/[<>"'`;]/g, '').slice(0, 256) : s);

  const mockData = {
    jobs: Array.from({ length: 10 }).map((_, i) => ({
      id: `mock-${i + 1}`,
      title: ['Senior Frontend Engineer', 'Backend Developer', 'Fullstack Engineer', 'Data Scientist'][i % 4],
      company: ['Acme Corp', 'Globex', 'Initech', 'Umbrella'][i % 4],
      location: ['Remote', 'NY, USA', 'Berlin, DE', 'London, UK'][i % 4],
      salary: ['$140k - $180k', '$110k - $140k', '€70k - €90k', '£60k - £80k'][i % 4],
      tags: ['React', 'Node', 'AWS', 'TypeScript'].slice(0, (i % 4) + 1),
      description: 'This is a mock job description to demonstrate the Job Details drawer.',
      type: ['Full-time', 'Contract', 'Part-time'][i % 3],
      experience: ['Junior', 'Mid', 'Senior'][i % 3]
    })),
    total: 42
  };

  return {
    flags,

    /**
     * PUBLIC_INTERFACE
     * searchJobs
     * Search jobs by filters; uses mock data when base URL is unset.
     *
     * @param {object} filters - Search parameters like keyword, location, etc.
     * @returns {Promise<{jobs: any[], total: number}>}
     */
    async searchJobs(filters = {}) {
      const cleaned = {
        ...filters,
        keyword: sanitize(filters.keyword),
        location: sanitize(filters.location)
      };
      if (isMock) {
        // Simulate filtering on mock
        const kw = (cleaned.keyword || '').toLowerCase();
        const loc = (cleaned.location || '').toLowerCase();
        const filtered = mockData.jobs.filter(j =>
          (!kw || j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw)) &&
          (!loc || j.location.toLowerCase().includes(loc))
        );
        return Promise.resolve({ jobs: filtered, total: mockData.total });
      }
      const qs = new URLSearchParams(cleaned).toString();
      return safeFetch(`/jobs/search?${qs}`);
    },

    /**
     * PUBLIC_INTERFACE
     * getJobById
     * Fetch a single job by id; falls back to mock.
     *
     * @param {string} id - Job identifier
     * @returns {Promise<any>}
     */
    async getJobById(id) {
      if (isMock) {
        return mockData.jobs.find(j => j.id === id) || mockData.jobs[0];
      }
      return safeFetch(`/jobs/${encodeURIComponent(id)}`);
    }
  };
}
