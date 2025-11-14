import React, { useEffect, useMemo, useState } from 'react';
import '../theme.css';
import SidebarFilters from '../components/SidebarFilters';
import JobList from '../components/JobList';
import JobDetailsDrawer from '../components/JobDetailsDrawer';
import { useApp } from '../context/AppContext';
import { createApiClient } from '../services/apiClient';

/**
 * PUBLIC_INTERFACE
 * HomePage
 * Main search page with left filters and job list.
 */
export default function HomePage() {
  const { filters, saveJob } = useApp();
  const api = useMemo(() => createApiClient(), []);
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(null);

  const runSearch = async (f = filters) => {
    try {
      const res = await api.searchJobs(f);
      setJobs(res.jobs || []);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Search failed', e);
      setJobs([]);
    }
  };

  useEffect(() => {
    runSearch(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="layout">
      <SidebarFilters onApply={runSearch} />
      <main className="content">
        <div className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0 }}>Jobs</h2>
            <div className="helper">Showing {jobs.length} results</div>
          </div>
          {api.flags.experimentsEnabled && (
            <span className="tag" title="Experiment flag enabled">Experiment</span>
          )}
        </div>

        <section aria-live="polite" aria-busy={false} style={{ marginTop: 12 }}>
          <JobList
            jobs={jobs}
            onSelect={(job) => setSelected(job)}
            onSave={(job) => saveJob(job)}
          />
        </section>
      </main>

      <JobDetailsDrawer
        open={!!selected}
        job={selected}
        onClose={() => setSelected(null)}
        onSave={saveJob}
      />
    </div>
  );
}
