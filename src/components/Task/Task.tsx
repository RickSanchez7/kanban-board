import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ITask } from '../../models/Task';
import './Task.scss';

interface TaskProps {
  task: ITask;
  activeTask?: boolean;
}

export const Task: FC<TaskProps> = ({ task, activeTask }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
    transition: {
      duration: 150, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging && !activeTask) {
    return (
      <div ref={setNodeRef} style={style} className='task-placeholder'>
        <h4>{task.title}</h4>
      </div>
    );
  }

  const numberOfSubTasksChecked = (): number => {
    let tasksChecked = 0;

    task.subTasks.forEach(sub => {
      if (sub.isChecked) {
        tasksChecked++;
      }
    });
    return tasksChecked;
  };

  if (!task) {
    return <div></div>;
  }

  const subTaskLength = task.subTasks?.length;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='task'
    >
      <h4>{task.title}</h4>
      {!!subTaskLength && (
        <p className='subtasks'>
          {numberOfSubTasksChecked()} of {subTaskLength} subtasks
        </p>
      )}
    </div>
  );
};
