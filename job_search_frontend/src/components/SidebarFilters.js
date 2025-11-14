import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * SidebarFilters
 * Search and filter panel controlling the in-memory filters state.
 */
export default function SidebarFilters({ onApply }) {
  const { filters, setFilters } = useApp();
  const [local, setLocal] = useState(filters);

  useEffect(() => setLocal(filters), [filters]);

  const set = (k, v) => setLocal(prev => ({ ...prev, [k]: v }));

  const sanitize = (s) => (typeof s === 'string' ? s.replace(/[<>"'`;]/g, '').slice(0, 256) : s);

  return (
    <aside className="sidebar" aria-label="Search and Filters">
      <h3>Search & Filters</h3>
      <div className="field">
        <label className="label" htmlFor="kw">Keyword</label>
        <input id="kw" className="input" value={local.keyword} onChange={e => set('keyword', sanitize(e.target.value))} placeholder="e.g., React, Backend" />
      </div>
      <div className="field">
        <label className="label" htmlFor="loc">Location</label>
        <input id="loc" className="input" value={local.location} onChange={e => set('location', sanitize(e.target.value))} placeholder="e.g., Remote, Berlin" />
      </div>
      <div className="field toggle">
        <input id="remote" type="checkbox" checked={local.remote} onChange={e => set('remote', e.target.checked)} />
        <label htmlFor="remote">Remote only</label>
      </div>
      <div className="field">
        <label className="label" htmlFor="exp">Experience level</label>
        <select id="exp" className="select" value={local.experience} onChange={e => set('experience', e.target.value)}>
          <option value="">Any</option>
          <option value="Junior">Junior</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>
      </div>
      <div className="field">
        <label className="label" htmlFor="salary">Minimum salary</label>
        <input id="salary" className="input" type="number" min="0" value={local.salaryMin} onChange={e => set('salaryMin', Number(e.target.value) || 0)} />
      </div>
      <div className="field">
        <label className="label" htmlFor="type">Job Type</label>
        <select id="type" className="select" value={local.jobType} onChange={e => set('jobType', e.target.value)}>
          <option value="">Any</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
        <button
          className="btn"
          onClick={() => {
            setFilters(local);
            onApply && onApply(local);
          }}
          aria-label="Apply filters"
        >
          Apply
        </button>
        <button
          className="btn secondary"
          onClick={() => {
            const cleared = { keyword: '', location: '', remote: false, experience: '', salaryMin: 0, jobType: '' };
            setLocal(cleared);
            setFilters(cleared);
            onApply && onApply(cleared);
          }}
          aria-label="Clear filters"
        >
          Clear
        </button>
      </div>

      <p className="helper" style={{ marginTop: 8 }}>
        Filters update the in-memory state and trigger a mock search.
      </p>
    </aside>
  );
}
