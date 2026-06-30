import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, GripVertical } from 'lucide-react';
import Checkbox from '../common/Checkbox';

export default function TaskCard({ task, onToggle, onEdit }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id, data: { ...task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
    opacity: isDragging ? 0.6 : 1,
  };

  // Add click handler that doesn't trigger drag
  const handleEditClick = (e) => {
    // Only trigger if we're not dragging
    if (!isDragging) {
      onEdit(task);
    }
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className={`planner-task-card glass-card ${isDragging ? 'dragging' : ''} ${task.completed ? 'completed' : ''}`}
      onClick={handleEditClick}
    >
      <div className="task-drag-handle" {...attributes} {...listeners}>
        <GripVertical size={16} />
      </div>
      
      <div className="task-content">
        <div className="task-header">
          <div onClick={(e) => e.stopPropagation()}>
            <Checkbox 
              checked={task.completed} 
              onChange={() => {
                onToggle(task.id);
              }} 
              className="task-checkbox-small"
            />
          </div>
          {task.category && (
            <div className="task-category-badge" style={{ backgroundColor: task.categoryColor }}>
              <span className="dot"></span>
              {task.category}
            </div>
          )}
        </div>
        
        <h4 className={`task-title-text ${task.completed ? 'strikethrough' : ''}`}>
          {task.title}
        </h4>
        
        {task.time && (
          <div className="task-meta">
            <Clock size={12} />
            <span>{task.time}</span>
          </div>
        )}
      </div>
    </div>
  );
}
