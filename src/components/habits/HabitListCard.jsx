import React from 'react';
import { MoreHorizontal, Plus, Check } from 'lucide-react';
import Card from '../common/Card';
import ProgressRing from '../common/ProgressRing';
import Button from '../common/Button';
import { getHabitStats } from '../../utils/habitUtils';

export default function HabitListCard({ habits, onAddHabit, onClickHabit }) {
  return (
    <Card className="habits-list-card">
      <div className="card-header">
        <h3>All Habits</h3>
        <Button size="sm" onClick={onAddHabit} icon={Plus}>Add Habit</Button>
      </div>

      <div className="habits-list">
        {habits.map(habit => {
          const { streak, progress, doneToday } = getHabitStats(habit);

          return (
            <div key={habit.id} className="habit-list-item" onClick={() => onClickHabit(habit)}>
              <div className="habit-info">
                <div className="habit-icon-wrapper">
                  <div
                    className="habit-icon-placeholder"
                    style={{
                      backgroundColor: habit.color || 'var(--accent-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {doneToday && <Check size={14} color="#fff" />}
                  </div>
                </div>
                <div>
                  <h4 className="habit-name">{habit.name}</h4>
                  <p className="habit-streak-text">{streak} day streak</p>
                </div>
              </div>

              <div className="habit-stats">
                <div className="mini-ring">
                  <ProgressRing progress={progress} size={40} strokeWidth={4} />
                </div>
                <button className="icon-btn" onClick={(e) => { e.stopPropagation(); onClickHabit(habit); }}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}