import React from 'react';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * ApplicationsPage
 * Placeholder applications tracker with status table.
 */
export default function ApplicationsPage() {
  const rows = [
    { company: 'Acme', role: 'Frontend Engineer', date: '2025-01-10', status: 'Applied', notes: 'Referred by Alex' },
    { company: 'Globex', role: 'Backend Dev', date: '2025-01-12', status: 'Interview', notes: 'Phone screen passed' },
  ];

  return (
    <div className="content">
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Applications</h2>
        <p className="helper">Track application status and notes.</p>
        <div className="card" role="table" aria-label="Applications table" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
            <thead>
              <tr>
                {['Company', 'Role', 'Applied On', 'Status', 'Notes'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#6B7280', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={idx} className="helper">
                  <td style={{ padding: '8px 10px' }}>{r.company}</td>
                  <td style={{ padding: '8px 10px' }}>{r.role}</td>
                  <td style={{ padding: '8px 10px' }}>{r.date}</td>
                  <td style={{ padding: '8px 10px' }}>{r.status}</td>
                  <td style={{ padding: '8px 10px' }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="helper">Future: Add CRUD for applications, filters, and export.</p>
      </div>
    </div>
  );
}
