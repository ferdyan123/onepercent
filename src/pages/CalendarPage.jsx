import React, { useState, useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import Card from '../components/common/Card';
import { useTranslation } from '../hooks/useTranslation';
import { calculateStreak, calculateLongestStreak, calculateProgress } from '../utils/habitUtils';

import './CalendarPage.css';

export default function CalendarPage() {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Aggregate across all habits: best current streak, best-ever streak,
  // and average 30-day consistency.
  const { longestStreak, currentStreak, completionRate } = useMemo(() => {
    const habits = state.habits;
    if (habits.length === 0) {
      return { longestStreak: 0, currentStreak: 0, completionRate: 0 };
    }

    const longest = Math.max(...habits.map(h => calculateLongestStreak(h.completions)));
    const current = Math.max(...habits.map(h => calculateStreak(h.completions)));
    const avgProgress = Math.round(
      habits.reduce((sum, h) => sum + calculateProgress(h.completions), 0) / habits.length
    );

    return { longestStreak: longest, currentStreak: current, completionRate: avgProgress };
  }, [state.habits]);

  return (
    <div className="calendar-page-container animate-fade-in">
      <div className="page-header">
        <h1>{t('dashboard.calendar') || 'Calendar'}</h1>
        <p className="text-secondary">Track your long-term consistency</p>
      </div>

      <Card className="calendar-main-card">
        <CalendarHeader 
          currentDate={currentDate} 
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
          onToday={handleToday}
        />
        
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-box intensity-none"></div>
            <span>No activity</span>
          </div>
          <div className="legend-item">
            <div className="legend-box intensity-low"></div>
            <span>Some</span>
          </div>
          <div className="legend-item">
            <div className="legend-box intensity-med"></div>
            <span>Most</span>
          </div>
          <div className="legend-item">
            <div className="legend-box intensity-high"></div>
            <span>Perfect</span>
          </div>
        </div>

        <CalendarGrid currentDate={currentDate} habits={state.habits} />
      </Card>
      
      <div className="calendar-stats-row animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <Card className="stat-card">
          <h4>Longest Streak</h4>
          <span className="stat-value">{longestStreak} Days</span>
        </Card>
        <Card className="stat-card">
          <h4>Current Streak</h4>
          <span className="stat-value text-accent">{currentStreak} Days</span>
        </Card>
        <Card className="stat-card">
          <h4>Completion Rate</h4>
          <span className="stat-value">{completionRate}%</span>
        </Card>
      </div>
    </div>
  );
}