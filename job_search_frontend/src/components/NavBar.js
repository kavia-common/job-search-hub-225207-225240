import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../theme.css';

/**
 * PUBLIC_INTERFACE
 * NavBar
 * Top navigation with brand, quick search input shortcut, and links.
 */
export default function NavBar({ onQuickSearch }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar" aria-label="Top Navigation">
      <div className="navbar-inner">
        <div className="brand" role="button" tabIndex={0} onClick={() => navigate('/')} onKeyDown={e => e.key === 'Enter' && navigate('/')}>
          <div className="brand-badge" aria-hidden="true" />
          <span className="brand-text">JobSearch Hub</span>
        </div>

        <form
          role="search"
          aria-label="Quick job search"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            const q = (data.get('q') || '').toString();
            if (onQuickSearch) onQuickSearch(q);
          }}
          style={{ flex: 1, maxWidth: 520, marginLeft: 12 }}
        >
          <input
            className="input"
            name="q"
            placeholder="Search jobs (Press Enter)…"
            aria-label="Search jobs"
          />
        </form>

        <div className="nav-links" role="navigation" aria-label="Primary">
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/saved">Saved</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/applications">Applications</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/alerts">Alerts</NavLink>
        </div>
      </div>
    </nav>
  );
}
