import { useState } from 'react';
import { createPortal } from 'react-dom';
import { FaCirclePlus } from 'react-icons/fa6';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { Column } from '../Column';
import { IColumn, ITask } from '../../models';
import { Task } from '../Task';
import { useColumStore, useTaskStore } from '../../store';

import './Board.scss';

export const Board = () => {
  const { columns, addColumn, setColumns } = useColumStore();
  const columnsId = columns.map(column => column.id);

  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);

  const { tasks, setTasks } = useTaskStore();
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const handleColumn = () => {
    addColumn({
      id: Math.floor(Math.random() * 10000000).toString(),
      title: `Column ${columns.length + 1}`,
    });
  };

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'column') {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === 'task') {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeColumnIndex = columns.findIndex(col => col.id === activeId);

    const overColumnIndex = columns.findIndex(col => col.id === overId);

    setColumns(arrayMove(columns, activeColumnIndex, overColumnIndex));
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === 'task';
    const isOverTask = over.data.current?.type === 'task';

    if (!isActiveTask) return;

    // Im dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      const activeTaskIndex = tasks.findIndex(tas => tas.id === activeId);

      const overTaskIndex = tasks.findIndex(tas => tas.id === overId);

      tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId;

      setTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex));
    }

    const isOverAColumn = over.data.current?.type === 'column';

    // Im dropping a Task over a column
    if (isActiveTask && isOverAColumn) {
      const activeTaskIndex = tasks.findIndex(tas => tas.id === activeId);

      tasks[activeTaskIndex].columnId = overId.toString();

      const overTaskIndex = tasks.findIndex(tas => tas.id === overId);

      setTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      collisionDetection={closestCenter}
    >
      <div className='board'>
        <SortableContext items={columnsId}>
          {columns.map(column => (
            <Column key={column.id} column={column} />
          ))}
        </SortableContext>
        <div className='button-container'>
          <button className='add-column' onClick={handleColumn}>
            <FaCirclePlus />
            Add column
          </button>
        </div>
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && <Column activeColumn={true} column={activeColumn} />}

          {activeTask && <Task task={activeTask} activeTask={true} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
