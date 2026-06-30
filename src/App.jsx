import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';

import AppLayout from './components/layout/AppLayout';
import PlaceholderPage from './components/common/PlaceholderPage';

import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalsPage';
import WeeklyPlannerPage from './pages/WeeklyPlannerPage';
import CalendarPage from './pages/CalendarPage';
import TodayPage from './pages/TodayPage';
import HabitsPage from './pages/HabitsPage';
import ReviewPage from './pages/ReviewPage';
import OnboardingPage from './pages/OnboardingPage';

// Placeholder Pages for unbuilt ones
const AnalyticsPage = () => <PlaceholderPage title="Analytics" />;
const SettingsPage = () => <PlaceholderPage title="Settings" />;

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/onboarding/*" element={<OnboardingPage />} />
              <Route element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="goals" element={<GoalsPage />} />
                <Route path="weekly-planner" element={<WeeklyPlannerPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="today" element={<TodayPage />} />
                <Route path="habits" element={<HabitsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="review" element={<ReviewPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
