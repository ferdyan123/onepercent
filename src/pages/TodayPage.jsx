import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';
import { formatDate, getDateKeyForOffset } from '../utils/dateUtils';
import FocusAreaBanner from '../components/today/FocusAreaBanner';
import JournalEntry from '../components/today/JournalEntry';
import TodayTasksCard from '../components/dashboard/TodayTasksCard';
import HabitStreaksCard from '../components/dashboard/HabitStreaksCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import './TodayPage.css';

export default function TodayPage() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);

  const [currentDateOffset, setCurrentDateOffset] = useState(0); // 0 = today, -1 = yesterday
  const selectedDateKey = getDateKeyForOffset(currentDateOffset);
  const isToday = currentDateOffset === 0;

  const displayDate = new Date();
  displayDate.setDate(displayDate.getDate() + currentDateOffset);

  // Real data scoped to the selected date
  const dayTasks = state.tasks.filter(t => t.date === selectedDateKey);
  const entry = state.journal.find(j => j.date === selectedDateKey) || {};

  const handleToggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const handleSaveFocusArea = (focusArea) => {
    dispatch({ type: 'UPSERT_JOURNAL_ENTRY', payload: { date: selectedDateKey, focusArea } });
  };

  const handleSaveJournal = (journalText) => {
    dispatch({ type: 'UPSERT_JOURNAL_ENTRY', payload: { date: selectedDateKey, journalText } });
  };

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
          {/* key={selectedDateKey} remounts these fresh whenever the user
              navigates to a different day, instead of syncing via effect */}
          <FocusAreaBanner key={`focus-${selectedDateKey}`} focusArea={entry.focusArea} onSave={handleSaveFocusArea} />
          
          <div className="today-tasks-wrapper animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <TodayTasksCard tasks={dayTasks} onToggle={handleToggleTask} />
          </div>
          
          <JournalEntry key={`journal-${selectedDateKey}`} journalText={entry.journalText} onSave={handleSaveJournal} />
        </div>
        
        <div className="today-side-col">
          <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
             <HabitStreaksCard habits={state.habits} />
          </div>
        </div>
      </div>
    </div>
  );
}