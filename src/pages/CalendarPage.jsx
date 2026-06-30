import React, { useState } from 'react';
import CalendarHeader from '../components/calendar/CalendarHeader';
import CalendarGrid from '../components/calendar/CalendarGrid';
import Card from '../components/common/Card';
import { useTranslation } from '../hooks/useTranslation';

import './CalendarPage.css';

export default function CalendarPage() {
  const { t } = useTranslation();
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

        <CalendarGrid currentDate={currentDate} />
      </Card>
      
      {/* Additional Stats Section */}
      <div className="calendar-stats-row animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <Card className="stat-card">
          <h4>Longest Streak</h4>
          <span className="stat-value">14 Days</span>
        </Card>
        <Card className="stat-card">
          <h4>Current Streak</h4>
          <span className="stat-value text-accent">5 Days</span>
        </Card>
        <Card className="stat-card">
          <h4>Completion Rate</h4>
          <span className="stat-value">78%</span>
        </Card>
      </div>
    </div>
  );
}
