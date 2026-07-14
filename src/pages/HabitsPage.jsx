import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import HabitListCard from '../components/habits/HabitListCard';
import HabitDetailModal from '../components/habits/HabitDetailModal';
import HabitFormModal from '../components/habits/HabitFormModal';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import { Repeat, Plus } from 'lucide-react';
import Button from '../components/common/Button';
import './HabitsPage.css';

export default function HabitsPage() {
  const { state, dispatch } = useContext(AppContext);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const habits = state.habits;

  const handleAddHabit = (habitData) => {
    dispatch({ type: 'ADD_HABIT', payload: habitData });
  };

  const handleDeleteHabit = (habitId) => {
    dispatch({ type: 'DELETE_HABIT', payload: habitId });
    setSelectedHabit(null);
  };

  const handleToggleToday = (habitId, date) => {
    dispatch({ type: 'TOGGLE_HABIT_COMPLETION', payload: { habitId, date } });
    // keep the modal in sync with the freshest habit data
    setSelectedHabit(prev => prev && prev.id === habitId
      ? state.habits.find(h => h.id === habitId)
      : prev);
  };

  return (
    <div className="habits-page-container animate-fade-in">
      <div className="page-header">
        <h1>Habits</h1>
        <p className="text-secondary">Manage and analyze your daily routines</p>
      </div>

      <div className="habits-grid">
        <div className="habits-main-col">
          {habits.length === 0 ? (
            <div className="glass-card-static empty-state" style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-4)' }}>
              <Repeat size={40} className="text-secondary" style={{ marginBottom: 'var(--space-3)' }} />
              <h3>No habits yet</h3>
              <p className="text-secondary" style={{ marginBottom: 'var(--space-4)' }}>
                Add a habit to start tracking your daily consistency.
              </p>
              <Button icon={Plus} onClick={() => setIsAddModalOpen(true)}>Add Your First Habit</Button>
            </div>
          ) : (
            <HabitListCard
              habits={habits}
              onAddHabit={() => setIsAddModalOpen(true)}
              onClickHabit={setSelectedHabit}
            />
          )}
        </div>

        <div className="habits-side-col">
          <WeeklyProgressChart />
        </div>
      </div>

      <HabitDetailModal
        isOpen={!!selectedHabit}
        onClose={() => setSelectedHabit(null)}
        habit={selectedHabit}
        onDelete={handleDeleteHabit}
        onToggleToday={handleToggleToday}
      />

      <HabitFormModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddHabit}
      />
    </div>
  );
}