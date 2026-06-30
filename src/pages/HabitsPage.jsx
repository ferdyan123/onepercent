import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import HabitListCard from '../components/habits/HabitListCard';
import HabitDetailModal from '../components/habits/HabitDetailModal';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import './HabitsPage.css';

export default function HabitsPage() {
  const { state } = useContext(AppContext);
  const [selectedHabit, setSelectedHabit] = useState(null);

  // If no habits exist, provide some dummy data
  const habits = state.habits.length > 0 ? state.habits : [
    { id: '1', name: 'Morning Workout', color: '#10B981' },
    { id: '2', name: 'Read 20 Pages', color: '#3B82F6' },
    { id: '3', name: 'Deep Work Session', color: '#7C3AED' }
  ];

  const handleAddHabit = () => {
    // In a full implementation, this would open an AddHabitModal
    alert("Add Habit functionality would open here.");
  };

  return (
    <div className="habits-page-container animate-fade-in">
      <div className="page-header">
        <h1>Habits</h1>
        <p className="text-secondary">Manage and analyze your daily routines</p>
      </div>

      <div className="habits-grid">
        <div className="habits-main-col">
          <HabitListCard 
            habits={habits} 
            onAddHabit={handleAddHabit} 
            onClickHabit={setSelectedHabit} 
          />
        </div>
        
        <div className="habits-side-col">
          <WeeklyProgressChart />
        </div>
      </div>

      <HabitDetailModal 
        isOpen={!!selectedHabit} 
        onClose={() => setSelectedHabit(null)} 
        habit={selectedHabit} 
      />
    </div>
  );
}
