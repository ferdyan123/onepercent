import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import { AppContext } from '../../context/AppContext';
import './AppLayout.css';

export default function AppLayout() {
  const { state } = useContext(AppContext);

  // If user hasn't completed onboarding, redirect to onboarding
  if (!state.user.isOnboarded) {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <TopBar />
        <main className="main-content">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
