import React, { useState } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { formatDate } from '../utils/dateUtils';
import FocusAreaBanner from '../components/today/FocusAreaBanner';
import JournalEntry from '../components/today/JournalEntry';
import TodayTasksCard from '../components/dashboard/TodayTasksCard';
import HabitStreaksCard from '../components/dashboard/HabitStreaksCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import './TodayPage.css';

export default function TodayPage() {
  const { t } = useTranslation();
  
  // Dummy Data for demonstration
  const [focusArea, setFocusArea] = useState('Trading Strategy Backtesting');
  const [journal, setJournal] = useState('I feel highly motivated today to finish all my tasks.');
  const [currentDateOffset, setCurrentDateOffset] = useState(0); // 0 = today, -1 = yesterday
  
  const displayDate = new Date();
  displayDate.setDate(displayDate.getDate() + currentDateOffset);
  
  const isToday = currentDateOffset === 0;

  const demoTasks = [
    { id: '1', title: 'Morning Meditation', completed: true },
    { id: '2', title: 'Read 20 Pages', completed: true },
    { id: '3', title: '30min Workout', completed: false, categoryColor: 'var(--accent-primary)' }
  ];

  const demoHabits = [
    { id: 'h1', name: 'Workout' },
    { id: 'h2', name: 'Reading' },
    { id: 'h3', name: 'Deep Work' }
  ];

  return (
    <div className="today-page-container animate-fade-in">
      <div className="today-header">
        <button className="icon-btn" onClick={() => setCurrentDateOffset(prev => prev - 1)}>
          <ChevronLeft size={24} />
        </button>
        <div className="today-title-group">
          <h2>{isToday ? t('today.title') : formatDate(displayDate, 'short')}</h2>
          <p className="today-subtitle">{formatDate(displayDate, 'long')}</p>
        </div>
        <button 
          className="icon-btn" 
          onClick={() => setCurrentDateOffset(prev => prev + 1)}
          disabled={isToday}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="today-grid">
        <div className="today-main-col">
          <FocusAreaBanner focusArea={focusArea} onSave={setFocusArea} />
          
          <div className="today-tasks-wrapper animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <TodayTasksCard tasks={demoTasks} onToggle={() => {}} />
          </div>
          
          <JournalEntry journalText={journal} onSave={setJournal} />
        </div>
        
        <div className="today-side-col">
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             <HabitStreaksCard habits={demoHabits} />
          </div>
          {/* Notes or other widgets could go here */}
        </div>
      </div>
    </div>
  );
}
