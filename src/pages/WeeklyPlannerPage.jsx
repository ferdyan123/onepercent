import React, { useState, useContext } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { AppContext } from '../context/AppContext';
import { useTranslation } from '../hooks/useTranslation';

import WeekNavigator from '../components/planner/WeekNavigator';
import DayColumn from '../components/planner/DayColumn';
import TaskCard from '../components/planner/TaskCard';
import TaskEditModal from '../components/planner/TaskEditModal';

import './WeeklyPlannerPage.css';

export default function WeeklyPlannerPage() {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  
  // Local state for the planner grid
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [weekOffset, setWeekOffset] = useState(0);
  
  // Dummy local state for dragging since we don't have a backend yet
  // In a real app, tasks would be fetched by the selected week's dates
  const [localTasks, setLocalTasks] = useState([
    { id: '1', title: 'Team Sync & Planning', day: 'Mon', completed: true, time: '10:00 AM', category: 'Work', categoryColor: '#7C3AED' },
    { id: '2', title: 'UI Research', day: 'Mon', completed: false, time: '1:00 PM', category: 'Design', categoryColor: '#10B981' },
    { id: '3', title: 'Mockups', day: 'Tue', completed: false, time: '9:30 AM', category: 'Design', categoryColor: '#10B981' },
    { id: '4', title: 'Client Call', day: 'Tue', completed: false, time: '3:00 PM', category: 'Work', categoryColor: '#7C3AED' },
    { id: '5', title: 'Finalize UI', day: 'Wed', completed: false, time: '10:00 AM', category: 'Work', categoryColor: '#7C3AED' },
    { id: '6', title: 'Launch Campaign', day: 'Thu', completed: false, time: '3:00 PM', category: 'Work', categoryColor: '#7C3AED' },
    { id: '7', title: 'QA Session', day: 'Fri', completed: false, time: '11:00 AM', category: 'Design', categoryColor: '#10B981' },
    { id: '8', title: 'Workout', day: 'Sat', completed: false, time: '9:00 AM', category: 'Personal', categoryColor: '#3B82F6' }
  ]);

  const [activeId, setActiveId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // 5px drag distance before firing (allows clicks to pass through)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Drag and drop handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    // Find the task and the container it's hovering over
    const activeTaskIndex = localTasks.findIndex(t => t.id === activeId);
    const activeTask = localTasks[activeTaskIndex];
    
    // Check if over a day column
    const overDay = days.includes(overId) ? overId : localTasks.find(t => t.id === overId)?.day;

    if (!overDay || activeTask.day === overDay) return;

    setLocalTasks(prev => {
      const activeItems = prev.filter(t => t.day === activeTask.day);
      const overItems = prev.filter(t => t.day === overDay);
      const activeIndex = activeItems.findIndex(t => t.id === activeId);
      const overIndex = days.includes(overId) 
        ? overItems.length + 1 
        : overItems.findIndex(t => t.id === overId);

      let newItems = [...prev];
      newItems[activeTaskIndex] = { ...activeTask, day: overDay };
      
      // We could use arrayMove here if we wanted strict ordering within the column
      return newItems;
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // Here we would also handle ordering within the same column using arrayMove
    // For simplicity, we just save the final state
  };

  // Task Actions
  const handleToggleTask = (taskId) => {
    setLocalTasks(prev => 
      prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    );
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    setLocalTasks(prev => 
      prev.map(t => t.id === updatedTask.id ? updatedTask : t)
    );
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleAddTask = (dayName, title) => {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      day: dayName,
      completed: false,
    };
    setLocalTasks(prev => [...prev, newTask]);
  };

  // Get date for header
  const getDateOffset = (dayIndex) => {
    const d = new Date();
    // Simplified logic for demo
    d.setDate(d.getDate() - d.getDay() + 1 + dayIndex + (weekOffset * 7));
    return d.getDate() + ' ' + d.toLocaleString('en-US', { month: 'short' });
  };

  const activeDragTask = activeId ? localTasks.find(t => t.id === activeId) : null;

  return (
    <div className="planner-container animate-fade-in">
      <WeekNavigator 
        weekNumber={25 + weekOffset} 
        onPrevWeek={() => setWeekOffset(prev => prev - 1)}
        onNextWeek={() => setWeekOffset(prev => prev + 1)}
        onCurrentWeek={() => setWeekOffset(0)}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="planner-grid">
          {days.map((day, index) => (
            <DayColumn 
              key={day}
              dayName={day}
              date={getDateOffset(index)}
              tasks={localTasks.filter(t => t.day === day)}
              onToggleTask={handleToggleTask}
              onEditTask={handleEditTask}
              onAddTask={handleAddTask}
            />
          ))}
        </div>

        <DragOverlay>
          {activeDragTask ? (
            <TaskCard task={activeDragTask} onToggle={() => {}} onEdit={() => {}} />
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskEditModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </div>
  );
}
