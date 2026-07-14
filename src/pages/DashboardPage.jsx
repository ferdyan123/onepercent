import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import WelcomeHeader from '../components/dashboard/WelcomeHeader';
import DailyProgressCard from '../components/dashboard/DailyProgressCard';
import HabitStreaksCard from '../components/dashboard/HabitStreaksCard';
import TodayTasksCard from '../components/dashboard/TodayTasksCard';
import WeeklyProgressChart from '../components/dashboard/WeeklyProgressChart';
import GoalProgressCard from '../components/dashboard/GoalProgressCard';
import DailyProgressLineChart from '../components/dashboard/DailyProgressLineChart';
import { getToday } from '../utils/dateUtils';
import { isDoneToday } from '../utils/habitUtils';

import './DashboardPage.css';

export default function DashboardPage() {
  const { state, dispatch } = useContext(AppContext);

  const today = getToday();
  // Tasks that are actually scheduled for today (from Weekly Planner / Today page)
  const todayTasks = state.tasks.filter(t => t.date === today);

  const totalHabits = state.habits.length;
  const completedHabits = state.habits.filter(h => isDoneToday(h.completions)).length;

  const handleToggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  return (
    <div className="dashboard-container">
      <WelcomeHeader />
      
      <div className="dashboard-grid">
        <div className="dashboard-col-main">
          <DailyProgressLineChart />
          <div className="dashboard-top-row">
            <DailyProgressCard completedHabits={completedHabits} totalHabits={totalHabits} />
            <HabitStreaksCard habits={state.habits} />
          </div>
          <WeeklyProgressChart />
        </div>
        
        <div className="dashboard-col-side">
          <TodayTasksCard tasks={todayTasks} onToggle={handleToggleTask} />
          <GoalProgressCard goals={state.goals} />
        </div>
      </div>
    </div>
  );
}