import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * JobList
 * Renders a list of job cards; emits onSelect for details.
 */
export default function JobList({ jobs, onSelect, onSave }) {
  return (
    <div className="job-list" role="list" aria-label="Job results">
      {jobs.map((job) => (
        <article key={job.id} className="card job-card" role="listitem">
          <div className="job-title">{job.title}</div>
          <div className="job-meta">
            <span aria-label="Company">{job.company}</span>
            <span aria-hidden="true">•</span>
            <span aria-label="Location">{job.location}</span>
            {job.salary ? (<><span aria-hidden="true">•</span><span aria-label="Salary">{job.salary}</span></>) : null}
          </div>
          <div className="tags">
            {(job.tags || []).map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
            <button className="btn ghost" onClick={() => onSelect && onSelect(job)} aria-label={`View details for ${job.title}`}>Details</button>
            <button className="btn" onClick={() => onSave && onSave(job)} aria-label={`Save ${job.title}`}>Save</button>
          </div>
        </article>
      ))}
      {jobs.length === 0 && (
        <div className="card">
          No jobs found. Try adjusting filters.
        </div>
      )}
      <div className="card" style={{ textAlign: 'center' }}>
        <span className="helper">Pagination / Infinite scroll coming soon</span>
      </div>
    </div>
  );
}
