import React, { useState, useContext, useMemo } from 'react';
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { AppContext } from '../context/AppContext';
import { getWeekDates, getWeekNumber, getWeekStart } from '../utils/dateUtils';

import WeekNavigator from '../components/planner/WeekNavigator';
import DayColumn from '../components/planner/DayColumn';
import TaskCard from '../components/planner/TaskCard';
import TaskEditModal from '../components/planner/TaskEditModal';

import './WeeklyPlannerPage.css';

export default function WeeklyPlannerPage() {
  const { state, dispatch } = useContext(AppContext);

  const [weekOffset, setWeekOffset] = useState(0);

  // The 7 real calendar dates for the currently viewed week.
  const weekDates = useMemo(() => getWeekDates(weekOffset), [weekOffset]);
  const dateKeys = useMemo(() => weekDates.map(d => d.dateKey), [weekDates]);
  const dateToDayName = useMemo(
    () => Object.fromEntries(weekDates.map(d => [d.dateKey, d.dayName])),
    [weekDates]
  );
  const dayNameToDate = useMemo(
    () => Object.fromEntries(weekDates.map(d => [d.dayName, d.dateKey])),
    [weekDates]
  );

  // Tasks that belong to this week, straight from AppContext — the single
  // source of truth. No local copy needed for normal rendering.
  const tasksForWeek = useMemo(
    () => state.tasks.filter(task => dateKeys.includes(task.date)),
    [state.tasks, dateKeys]
  );

  // While a card is being dragged, we only need to preview ONE task
  // landing in a new day — not mirror the whole list — so this stays a
  // small, targeted piece of state instead of a synced copy of context.
  const [dragPreview, setDragPreview] = useState(null); // { taskId, date }
  const [activeId, setActiveId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayTasks = useMemo(() => {
    if (!dragPreview) return tasksForWeek;
    return tasksForWeek.map(t => t.id === dragPreview.taskId ? { ...t, date: dragPreview.date } : t);
  }, [tasksForWeek, dragPreview]);

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

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
    setDragPreview(null);
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTaskId = active.id;
    const overId = over.id;
    if (activeTaskId === overId) return;

    const activeTask = displayTasks.find(t => t.id === activeTaskId);
    if (!activeTask) return;

    const overDay = weekDates.some(d => d.dayName === overId)
      ? overId
      : dateToDayName[displayTasks.find(t => t.id === overId)?.date];

    if (!overDay || dateToDayName[activeTask.date] === overDay) return;

    setDragPreview({ taskId: activeTaskId, date: dayNameToDate[overDay] });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && dragPreview && dragPreview.taskId === active.id) {
      dispatch({ type: 'UPDATE_TASK', payload: { id: active.id, date: dragPreview.date } });
    }
    setDragPreview(null);
  };

  // Task Actions — all committed straight to AppContext
  const handleToggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId) => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleAddTask = (dayName, title) => {
    dispatch({
      type: 'ADD_TASK',
      payload: {
        id: crypto.randomUUID(),
        title,
        date: dayNameToDate[dayName],
        completed: false
      }
    });
  };

  const activeDragTask = activeId ? displayTasks.find(t => t.id === activeId) : null;

  const weekNumber = getWeekNumber(getWeekStart(weekOffset));
  const weekLabel = `${weekDates[0].label} - ${weekDates[6].label}`;

  return (
    <div className="planner-container animate-fade-in">
      <WeekNavigator 
        weekNumber={weekNumber}
        weekLabel={weekLabel}
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
          {weekDates.map(({ dayName, label }) => (
            <DayColumn 
              key={dayName}
              dayName={dayName}
              date={label}
              tasks={displayTasks.filter(t => dateToDayName[t.date] === dayName)}
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

      {isModalOpen && (
        <TaskEditModal 
          key={editingTask?.id}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          task={editingTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
}