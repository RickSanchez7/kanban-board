import { FC } from 'react';
import { ITask } from '../../models';

import './ViewTask.scss';
import { Checkbox } from '../../ui/Checkbox';
import { useColumStore } from '../../store';

interface TaskProps {
  task: ITask;
  numberOfSubTasksChecked: number;
  toggleCheckbox: (subTaskId: string) => void;
}

export const ViewTask: FC<TaskProps> = ({
  task,
  numberOfSubTasksChecked,
  toggleCheckbox,
}) => {
  const { getColumns } = useColumStore();

  const columnTitle = getColumns().find(
    column => column.id === task.columnId
  )?.title;
  return (
    <main className='view-task'>
      <h2 className='view-task-title'>{task.title}</h2>
      <p className='view-task-description'>{task.description}</p>
      {task.subTasks.length > 0 && (
        <div>
          <h3 className='view-task-subtask-title'>
            Subtasks (
            <span>
              {numberOfSubTasksChecked} of {task.subTasks.length}
            </span>
            )
          </h3>
          {task.subTasks.map(subTask => (
            <div className='view-task-checkbox' key={subTask.title}>
              <Checkbox
                id={subTask.id}
                toggleCheckbox={toggleCheckbox}
                label={subTask.title}
                isChecked={subTask.isChecked}
              />
            </div>
          ))}
        </div>
      )}
      <div className='view-task-status'>
        {task.assignUser && (
          <div>
            <h3>Assign To</h3>
            <p>
              {task.assignUser.name} ({task.assignUser.position})
            </p>
          </div>
        )}
        <div>
          <h3>Status</h3>
          <p>{columnTitle}</p>
        </div>
      </div>
    </main>
  );
};
