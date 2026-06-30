import React, { useState } from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';

export default function DayColumn({ dayName, date, tasks, onToggleTask, onEditTask, onAddTask }) {
  const { setNodeRef, isOver } = useDroppable({
    id: dayName,
    data: { dayName }
  });

  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      onAddTask(dayName, newTaskTitle);
      setNewTaskTitle('');
      setIsAdding(false);
    }
  };

  return (
    <div className={`day-column ${isOver ? 'drag-over' : ''}`}>
      <div className="day-header">
        <span className="day-name">{dayName}</span>
        <span className="day-date">{date}</span>
      </div>
      
      <div ref={setNodeRef} className="day-content">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          <div className="tasks-container">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={onToggleTask}
                onEdit={onEditTask}
              />
            ))}
          </div>
        </SortableContext>
        
        {/* Inline Add Task */}
        {isAdding ? (
          <form onSubmit={handleAddSubmit} className="add-task-form">
            <input
              type="text"
              autoFocus
              className="input add-task-input"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Task name..."
              onBlur={() => {
                if (!newTaskTitle.trim()) setIsAdding(false);
              }}
            />
          </form>
        ) : (
          <button 
            className="add-task-btn" 
            onClick={() => setIsAdding(true)}
          >
            <Plus size={16} />
            <span>Add Task</span>
          </button>
        )}
      </div>
    </div>
  );
}
