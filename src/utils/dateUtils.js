// Returns today's date in YYYY-MM-DD format
export function getToday() {
  return toDateKey(new Date());
}

// Format any Date object as YYYY-MM-DD (local time, not UTC)
export function toDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// YYYY-MM-DD for "today + dayOffset" (dayOffset can be negative)
export function getDateKeyForOffset(dayOffset) {
  const d = new Date();
  d.setDate(d.getDate() + dayOffset);
  return toDateKey(d);
}

// Monday of the week containing `date`, shifted by `weekOffset` full weeks.
export function getWeekStart(weekOffset = 0, date = new Date()) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diffToMonday + weekOffset * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

// Array of 7 {dayName, dateKey, label} for the week starting at weekStart.
export function getWeekDates(weekOffset = 0) {
  const start = getWeekStart(weekOffset);
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return dayNames.map((dayName, i) => {
    const d = new Date(start);
    d.setDate(d.getDate() + i);
    return {
      dayName,
      dateKey: toDateKey(d),
      label: d.getDate() + ' ' + d.toLocaleString('en-US', { month: 'short' })
    };
  });
}

// Format a YYYY-MM-DD date string
export function formatDate(dateString, format = 'long') {
  if (!dateString) return '';
  const date = new Date(dateString);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }
  
  return dateString;
}

// Get the ISO week number
export function getWeekNumber(date = new Date()) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7);
}

// Return greeting key ('morning', 'afternoon', 'evening', 'night')
export function getGreetingKey() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}