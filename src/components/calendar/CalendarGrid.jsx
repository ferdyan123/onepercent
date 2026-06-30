import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function CalendarGrid({ currentDate, habitData }) {
  // Helper to get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper to get starting day (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  
  // Adjust so Monday is the first day of the week
  let firstDay = getFirstDayOfMonth(year, month);
  firstDay = firstDay === 0 ? 6 : firstDay - 1; 

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const currentDay = today.getDate();

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const cells = [];
  
  // Empty cells for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="calendar-cell empty"></div>);
  }

  // Cells for each day
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = isCurrentMonth && d === currentDay;
    
    // Simulate habit completion data based on date for demo purposes
    // In a real app, this would use actual `habitData` mapped by date
    const dateStr = `${year}-${String(month+1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const completionRate = habitData && habitData[dateStr] 
      ? habitData[dateStr].rate 
      : (d < currentDay && isCurrentMonth ? Math.random() : 0); // random demo data for past days

    let cellClass = "calendar-cell";
    if (isToday) cellClass += " is-today";
    
    // Calculate intensity color based on completion rate
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
        
        {/* Render dots or mini-bars indicating specific habits completed */}
        <div className="cell-details">
          {completionRate > 0 && (
            <div className="habit-dots">
               {/* Just showing dummy dots to represent habits done */}
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
