import React, { createContext, useReducer, useEffect } from 'react';

export const AppContext = createContext();

const initialState = {
  user: { name: '', isOnboarded: false },
  tasks: [],
  habits: [],
  goals: [],
  reviews: [],
  journal: []
};

// Derive a status label from progress so it always stays consistent
// with the color logic already used in GoalCard.
function deriveGoalStatus(progress) {
  if (progress >= 75) return 'onTrack';
  if (progress < 25) return 'behind';
  return 'atRisk';
}

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload };

    case 'COMPLETE_ONBOARDING':
      return { ...state, user: { ...state.user, isOnboarded: true, name: action.payload.name } };

    // ── TASKS ──────────────────────────────────
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload.id ? { ...t, ...action.payload } : t)
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t)
      };

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.payload) };

    // ── GOALS ──────────────────────────────────
    case 'ADD_GOAL':
      return {
        ...state,
        goals: [...state.goals, {
          ...action.payload,
          status: action.payload.status || deriveGoalStatus(action.payload.progress || 0)
        }]
      };

    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map(g => {
          if (g.id !== action.payload.id) return g;
          const merged = { ...g, ...action.payload };
          return { ...merged, status: deriveGoalStatus(merged.progress) };
        })
      };

    case 'DELETE_GOAL':
      return { ...state, goals: state.goals.filter(g => g.id !== action.payload) };

    // ── HABITS ─────────────────────────────────
    case 'ADD_HABIT':
      return {
        ...state,
        habits: [...state.habits, {
          completions: {},
          createdAt: new Date().toISOString(),
          ...action.payload
        }]
      };

    case 'UPDATE_HABIT':
      return {
        ...state,
        habits: state.habits.map(h => h.id === action.payload.id ? { ...h, ...action.payload } : h)
      };

    case 'DELETE_HABIT':
      return { ...state, habits: state.habits.filter(h => h.id !== action.payload) };

    // payload: { habitId, date }  — toggles completion for that date
    case 'TOGGLE_HABIT_COMPLETION':
      return {
        ...state,
        habits: state.habits.map(h => {
          if (h.id !== action.payload.habitId) return h;
          const completions = { ...h.completions };
          completions[action.payload.date] = !completions[action.payload.date];
          return { ...h, completions };
        })
      };

    // ── REVIEWS ────────────────────────────────
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };

    // payload: { weekStart, wentWell, improve } — upserts by weekStart so
    // re-saving the same week's reflection edits it instead of duplicating.
    case 'UPSERT_REVIEW': {
      const idx = state.reviews.findIndex(r => r.weekStart === action.payload.weekStart);
      const reviews = [...state.reviews];
      if (idx >= 0) {
        reviews[idx] = { ...reviews[idx], ...action.payload };
      } else {
        reviews.push(action.payload);
      }
      return { ...state, reviews };
    }

    // ── JOURNAL / DAILY ENTRIES ────────────────
    // payload: { date, focusArea?, journalText? } — upserts by date
    case 'UPSERT_JOURNAL_ENTRY': {
      const idx = state.journal.findIndex(j => j.date === action.payload.date);
      const journal = [...state.journal];
      if (idx >= 0) {
        journal[idx] = { ...journal[idx], ...action.payload };
      } else {
        journal.push(action.payload);
      }
      return { ...state, journal };
    }

    default:
      return state;
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('onepercent_data');
    if (saved) {
      try {
        dispatch({ type: 'LOAD_STATE', payload: JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse state', e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    // Only save if it's not the initial empty state
    if (state.user.isOnboarded) {
      localStorage.setItem('onepercent_data', JSON.stringify(state));
    }
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};