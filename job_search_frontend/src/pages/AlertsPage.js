import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * AlertsPage
 * Placeholder page to configure keyword/location alerts.
 */
export default function AlertsPage() {
  return (
    <div className="content">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Job Alerts</h2>
        <p className="helper">Configure alerts to get notified about new jobs.</p>
        <div className="field">
          <label className="label" htmlFor="alert-kw">Keyword</label>
          <input id="alert-kw" className="input" placeholder="e.g., React" />
        </div>
        <div className="field">
          <label className="label" htmlFor="alert-loc">Location</label>
          <input id="alert-loc" className="input" placeholder="e.g., Remote" />
        </div>
        <button className="btn">Create Alert (placeholder)</button>
      </div>
    </div>
  );
}
