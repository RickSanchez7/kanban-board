import { FC } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { ITask } from '../../models/Task';
import { useTaskStore } from '../../store';
import { Dropdown } from '../../ui/Dropdown';

import './Task.scss';

interface TaskProps {
  task: ITask;
  activeTask?: boolean;
}

export const Task: FC<TaskProps> = ({ task, activeTask }) => {
  const { deleteTask } = useTaskStore();

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
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging && !activeTask) {
    const a = document.getElementById(task.id);
    a?.classList.add('draggable');
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className='task-placeholder'
      ></div>
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

  const handleDeleteTask = () => {
    deleteTask(task.id);
  };

  const a = document.getElementById(task.id);
  a?.classList.remove('draggable');

  const subTaskLength = task.subTasks?.length;

  const itemlist = [
    {
      name: 'delete',
      callback: handleDeleteTask,
    },
  ];

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='task'
      id={task.id}
      onClick={() => console.log('task')}
    >
      <div>
        <h4>{task.title}</h4>
        {!!subTaskLength && (
          <p className='subtasks'>
            {numberOfSubTasksChecked()} of {subTaskLength} subtasks
          </p>
        )}
      </div>
      <div className='task-dropdown'>
        <Dropdown itemlist={itemlist} />
      </div>
    </div>
  );
};
