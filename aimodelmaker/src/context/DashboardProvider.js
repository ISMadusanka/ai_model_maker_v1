// src/context/DashboardProvider.js
import React, { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [dashboardProps, setDashboardProps] = useState({ projectID: '' });

  return (
    <DashboardContext.Provider value={{ dashboardProps, setDashboardProps }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
