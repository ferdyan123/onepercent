import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import DailyProgressCard from '../components/dashboard/DailyProgressCard';
import HabitStreaksCard from '../components/dashboard/HabitStreaksCard';
import TodayTasksCard from '../components/dashboard/TodayTasksCard';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import GoalProgressCard from '../components/dashboard/GoalProgressCard';
import DailyProgressLineChart from '../components/dashboard/DailyProgressLineChart';

import './DashboardPage.css';

export default function DashboardPage() {
  const { state, dispatch } = useContext(AppContext);

  // Generate some dummy tasks if empty for demo purposes
  const demoTasks = [
    { id: '1', title: 'Morning Meditation', completed: true },
    { id: '2', title: 'Read 20 Pages', completed: true },
    { id: '3', title: '30min Workout', completed: false, categoryColor: 'var(--accent-primary)' },
    { id: '4', title: 'Project Focus', completed: false },
    { id: '5', title: 'Drink Water', completed: false }
  ];

  const tasks = state.tasks.length > 0 ? state.tasks : demoTasks;
  const habits = state.habits;

  const handleToggleTask = (id) => {
    // If it's a real task from state
    if (state.tasks.find(t => t.id === id)) {
      dispatch({ type: 'TOGGLE_TASK', payload: id });
    }
  };

  return (
    <div className="dashboard-container">
      <WelcomeHeader />
      
      <div className="dashboard-grid">
        <div className="dashboard-col-main">
          <DailyProgressLineChart />
          <div className="dashboard-top-row">
            <DailyProgressCard completedHabits={2} totalHabits={5} />
            <HabitStreaksCard habits={habits} />
          </div>
          <WeeklyProgressChart />
        </div>
        
        <div className="dashboard-col-side">
          <TodayTasksCard tasks={tasks} onToggle={handleToggleTask} />
          <GoalProgressCard goals={state.goals} />
        </div>
      </div>
    </div>
  );
}
