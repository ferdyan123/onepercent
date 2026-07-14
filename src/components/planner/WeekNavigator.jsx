import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function WeekNavigator({ weekNumber, weekLabel, onPrevWeek, onNextWeek, onCurrentWeek }) {
  const { t } = useTranslation();
  
  return (
    <div className="week-navigator">
      <div className="week-nav-controls">
        <button className="icon-btn" onClick={onPrevWeek}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="current-week-label">
          {t('planner.weekLabel', { week: weekNumber })}
          {weekLabel && <span className="week-date-range"> • {weekLabel}</span>}
        </h2>
        <button className="icon-btn" onClick={onNextWeek}>
          <ChevronRight size={20} />
        </button>
      </div>
      <button className="btn btn-sm btn-secondary" onClick={onCurrentWeek}>
        Current week
      </button>
    </div>
  );
}