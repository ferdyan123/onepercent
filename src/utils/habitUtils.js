import { getToday, toDateKey } from './dateUtils';

// Current streak: count consecutive completed days working backwards from
// today. If today isn't completed yet, we still allow the streak to count
// from yesterday (so it doesn't reset to 0 just because the user hasn't
// checked in yet today).
export function calculateStreak(completions = {}) {
  let streak = 0;
  const cursor = new Date();

  // If today isn't done, start counting from yesterday instead.
  if (!completions[toDateKey(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (completions[toDateKey(cursor)]) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

// Total number of days ever marked complete.
export function calculateTotalCompletions(completions = {}) {
  return Object.values(completions).filter(Boolean).length;
}

// Completions within the current calendar month.
export function calculateThisMonthCompletions(completions = {}) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  return Object.entries(completions).filter(([dateKey, done]) => {
    if (!done) return false;
    const d = new Date(dateKey);
    return d.getFullYear() === year && d.getMonth() === month;
  }).length;
}

// Consistency %, based on completions over the last N days (default 30).
export function calculateProgress(completions = {}, days = 30) {
  let done = 0;
  const cursor = new Date();

  for (let i = 0; i < days; i++) {
    if (completions[toDateKey(cursor)]) done += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return Math.round((done / days) * 100);
}

// Longest streak ever achieved (not just the current one) — scans every
// completed date and finds the longest run of consecutive days.
export function calculateLongestStreak(completions = {}) {
  const doneDates = Object.entries(completions)
    .filter(([, done]) => done)
    .map(([date]) => date)
    .sort();

  if (doneDates.length === 0) return 0;

  let longest = 1;
  let current = 1;

  for (let i = 1; i < doneDates.length; i++) {
    const prev = new Date(doneDates[i - 1]);
    const curr = new Date(doneDates[i]);
    const diffDays = Math.round((curr - prev) / 86400000);

    if (diffDays === 1) {
      current += 1;
      longest = Math.max(longest, current);
    } else {
      current = 1;
    }
  }

  return longest;
}

// Fraction (0–1) of all habits completed on a specific date. Used by the
// Calendar heatmap. Returns 0 if there are no habits yet.
export function getDayCompletionRate(habits = [], dateKey) {
  if (habits.length === 0) return 0;
  const doneCount = habits.filter(h => h.completions?.[dateKey]).length;
  return doneCount / habits.length;
}

// Aggregate consistency for a set of calendar dates (e.g. one week) across
// all habits — used by the Weekly Review score.
export function getConsistencyForDates(habits = [], dateKeys = []) {
  const possible = habits.length * dateKeys.length;
  if (possible === 0) return { done: 0, possible: 0, percent: 0 };

  let done = 0;
  habits.forEach(h => {
    dateKeys.forEach(dateKey => {
      if (h.completions?.[dateKey]) done += 1;
    });
  });

  return { done, possible, percent: Math.round((done / possible) * 100) };
}


export function isDoneToday(completions = {}) {
  return !!completions[getToday()];
}

// Convenience: compute all stats for a habit at once.
export function getHabitStats(habit) {
  const completions = habit?.completions || {};
  return {
    streak: calculateStreak(completions),
    total: calculateTotalCompletions(completions),
    thisMonth: calculateThisMonthCompletions(completions),
    progress: calculateProgress(completions),
    doneToday: isDoneToday(completions)
  };
}