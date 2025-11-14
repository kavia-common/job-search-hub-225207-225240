import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './theme.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import AlertsPage from './pages/AlertsPage';
import ApplicationsPage from './pages/ApplicationsPage';
import SavedJobsPage from './pages/SavedJobsPage';
import { AppProvider, useApp } from './context/AppContext';

/**
 * PUBLIC_INTERFACE
 * AppShell
 * Wraps router and global layout.
 */
function AppShell() {
  const navigate = useNavigate();
  const { setFilters } = useApp();

  const handleQuickSearch = (q) => {
    setFilters(prev => ({ ...prev, keyword: q || '' }));
    navigate('/');
  };

  return (
    <div className="app-shell">
      <NavBar onQuickSearch={handleQuickSearch} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/saved" element={<SavedJobsPage />} />
      </Routes>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * App
 * Top-level component to provide context and router.
 */
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AppProvider>
  );
}
