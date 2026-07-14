import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { toDateKey } from '../../utils/dateUtils';
import { getDayCompletionRate } from '../../utils/habitUtils';

export default function CalendarGrid({ currentDate, habits = [] }) {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  // Adjust so Monday is the first day of the week
  let firstDay = getFirstDayOfMonth(year, month);
  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  const today = new Date();
  const todayKey = toDateKey(today);
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const currentDay = today.getDate();

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const cells = [];

  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && d === currentDay;
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isPastOrToday = dateKey <= todayKey;

    // Real completion rate from habit data — only meaningful for days that
    // have already happened (future days simply have no data yet).
    const completionRate = isPastOrToday ? getDayCompletionRate(habits, dateKey) : 0;

    let cellClass = "calendar-cell";
    if (isToday) cellClass += " is-today";

    let intensityClass = "";
    if (completionRate > 0.8) intensityClass = "intensity-high";
    else if (completionRate > 0.4) intensityClass = "intensity-med";
    else if (completionRate > 0) intensityClass = "intensity-low";

    cells.push(
      <div key={`day-${d}`} className={`${cellClass} ${intensityClass}`}>
        <div className="cell-header">
          <span className="cell-date">{d}</span>
          {completionRate > 0.8 && <CheckCircle2 size={12} className="perfect-day-icon" />}
        </div>

        <div className="cell-details">
          {completionRate > 0 && (
            <div className="habit-dots">
              <span className="dot" style={{ background: 'var(--accent-primary)' }}></span>
              {completionRate > 0.5 && <span className="dot" style={{ background: 'var(--success)' }}></span>}
              {completionRate > 0.8 && <span className="dot" style={{ background: 'var(--accent-warm)' }}></span>}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-grid-wrapper animate-scale-in" style={{ animationDelay: '100ms' }}>
      <div className="calendar-days-header">
        {dayNames.map(day => (
          <div key={day} className="day-name-col">{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {cells}
      </div>
    </div>
  );
}