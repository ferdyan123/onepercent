import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import Card from '../common/Card';
import Checkbox from '../common/Checkbox';
import { MoreHorizontal } from 'lucide-react';

export default function TodayTasksCard({ tasks, onToggle }) {
  const { t } = useTranslation();

  return (
    <Card className="dashboard-card today-tasks-card animate-scale-in" style={{ animationDelay: '300ms' }}>
      <div className="card-header">
        <h3>{t('dashboard.todayTasks')}</h3>
        <button className="icon-btn"><MoreHorizontal size={18} /></button>
      </div>
      
      <div className="tasks-list">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <Checkbox 
                checked={task.completed} 
                onChange={() => onToggle(task.id)} 
              />
              <div className="task-details">
                <span className={`task-title ${task.completed ? 'strikethrough' : ''}`}>
                  {task.title}
                </span>
                {task.category && (
                  <span className="task-category-dot" style={{ backgroundColor: task.categoryColor }}></span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-tasks">
            <p>{t('dashboard.noTasksToday')}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
