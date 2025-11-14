import React from 'react';
import '../theme.css';
import { useApp } from '../context/AppContext';
import JobList from '../components/JobList';

/**
 * PUBLIC_INTERFACE
 * SavedJobsPage
 * Shows saved jobs using global context.
 */
export default function SavedJobsPage() {
  const { savedJobs, removeSaved } = useApp();
  return (
    <div className="content">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Saved Jobs</h2>
        <p className="helper">Your saved roles appear here.</p>
      </div>
      <JobList jobs={savedJobs} onSelect={() => {}} onSave={(job) => removeSaved(job.id)} />
    </div>
  );
}
