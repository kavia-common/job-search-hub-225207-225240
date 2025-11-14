import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * JobDetailsDrawer
 * Right-side drawer for selected job details with save/apply.
 */
export default function JobDetailsDrawer({ open, job, onClose, onSave }) {
  return (
    <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Job details">
      <div className="drawer-header">
        <div style={{ display: 'grid' }}>
          <strong>{job?.title || 'Job Details'}</strong>
          <span className="helper">{job?.company} • {job?.location}</span>
        </div>
        <button className="btn secondary" onClick={onClose} aria-label="Close details">Close</button>
      </div>
      <div className="drawer-body">
        {job ? (
          <>
            {job.salary && <div className="card"><strong>Compensation</strong><div className="helper">{job.salary}</div></div>}
            <div className="card">
              <strong>Description</strong>
              <p style={{ marginTop: 8 }}>{job.description || 'No description provided.'}</p>
            </div>
            <div className="card">
              <strong>Benefits</strong>
              <ul className="helper" style={{ marginTop: 8 }}>
                <li>Health insurance</li>
                <li>Flexible hours</li>
                <li>Learning budget</li>
              </ul>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn" onClick={() => onSave && onSave(job)}>Save</button>
              <button className="btn secondary" onClick={() => alert('Apply flow placeholder')}>Apply</button>
            </div>
          </>
        ) : (
          <div className="helper">Select a job to view details.</div>
        )}
      </div>
    </aside>
  );
}
