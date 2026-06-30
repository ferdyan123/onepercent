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

function appReducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, user: { ...state.user, isOnboarded: true, name: action.payload.name } };
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(t => t.id === action.payload ? { ...t, completed: !t.completed } : t)
      };
    // Add other cases as needed...
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
