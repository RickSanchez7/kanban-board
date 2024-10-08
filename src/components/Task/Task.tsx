import type { ReactElement, FC } from 'react';

import { ITask } from '../../models/Task';
import { useTaskStore } from '../../store';
import { Dropdown } from '../../ui/Dropdown';

import { DraggableStateSnapshot } from 'react-beautiful-dnd';
import { Modal } from '../../ui/Modal';
import { ViewTask } from '../ViewTask';
import { CreateTaskForm } from '../CreateTaskForm';
import './Task.scss';

interface TaskProps {
  task: ITask;
  snapshot: DraggableStateSnapshot;
}

export const Task: FC<TaskProps> = ({ task, snapshot }) => {
  const { deleteTask, updateTask } = useTaskStore();

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

  const viewTask = ({ children }: { children: ReactElement }) => (
    <Modal.Open opens='view-task'>{children}</Modal.Open>
  );

  const editTask = ({ children }: { children: ReactElement }) => {
    return <Modal.Open opens='edit-task'>{children}</Modal.Open>;
  };

  const itemlist = [
    {
      name: 'delete task',
      callback: handleDeleteTask,
    },
    {
      name: 'view task',
      JsxElement: viewTask,
    },
    {
      name: 'edit task',
      JsxElement: editTask,
    },
  ];

  const toggleCheckbox = (subTaskId: string) => {
    const newTask = {
      ...task,
      subTasks: task.subTasks.map(subTask => {
        if (subTask.id === subTaskId) {
          return {
            ...subTask,
            isChecked: !subTask.isChecked,
          };
        }
        return subTask;
      }),
    };

    updateTask(newTask);
  };

  return (
    <Modal>
      <Modal.Open opens='view-task'>
        <div
          className={`task ${snapshot.isDragging ? 'draggable' : ''}`}
          id={task.id}
        >
          <div className='task-left-side'>
            <h4>{task.title}</h4>
            {!!subTaskLength && (
              <p className='task-subtasks'>
                {numberOfSubTasksChecked()} of {subTaskLength} subtasks
              </p>
            )}
          </div>
          <div className='task-right-side'>
            <div className='task-dropdown'>
              <Dropdown itemlist={itemlist} />
            </div>
            {task.assignUser && (
              <div className='task-user'>{task.assignUser?.name[0]}</div>
            )}
          </div>
        </div>
      </Modal.Open>
      <Modal.Window name='view-task'>
        <ViewTask
          task={task}
          numberOfSubTasksChecked={numberOfSubTasksChecked()}
          toggleCheckbox={toggleCheckbox}
        />
      </Modal.Window>
      <Modal.Window name='edit-task'>
        <CreateTaskForm task={task} title='Edit Task' />
      </Modal.Window>
    </Modal>
  );
};
