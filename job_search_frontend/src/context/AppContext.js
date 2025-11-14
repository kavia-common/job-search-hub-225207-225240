import React, { createContext, useContext, useMemo, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * AppContext
 * Holds global UI state for filters and saved jobs.
 */
const AppContext = createContext(undefined);

/**
 * PUBLIC_INTERFACE
 * AppProvider
 * Provides application state to children.
 */
export function AppProvider({ children }) {
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    remote: false,
    experience: '',
    salaryMin: 0,
    jobType: ''
  });

  const [savedJobs, setSavedJobs] = useState([]);

  const value = useMemo(() => ({
    filters,
    setFilters,
    savedJobs,
    saveJob: (job) => {
      setSavedJobs((prev) => {
        if (prev.find(j => j.id === job.id)) return prev;
        return [...prev, job];
      });
    },
    removeSaved: (id) => {
      setSavedJobs(prev => prev.filter(j => j.id !== id));
    }
  }), [filters, savedJobs]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useApp
 * Hook to access AppContext.
 */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
