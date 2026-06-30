import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

export default function CalendarHeader({ currentDate, onPrevMonth, onNextMonth, onToday }) {
  const { t } = useTranslation();
  
  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
  const year = currentDate.getFullYear();

  return (
    <div className="calendar-header-nav">
      <div className="calendar-nav-controls">
        <button className="icon-btn" onClick={onPrevMonth}>
          <ChevronLeft size={20} />
        </button>
        <h2 className="current-month-label">
          {monthName} {year}
        </h2>
        <button className="icon-btn" onClick={onNextMonth}>
          <ChevronRight size={20} />
        </button>
      </div>
      <button className="btn btn-sm btn-secondary" onClick={onToday}>
        {t('common.today') || 'Today'}
      </button>
    </div>
  );
}
