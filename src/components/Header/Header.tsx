import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FaPlus } from 'react-icons/fa6';

import { useColumStore, useTaskStore } from '../../store';
import { Modal } from '../../ui/Modal';
import { AddTaskForm } from '../AddTaskForm';
import { TaskFormSchemaType, TaskFormSchema } from '../../schema/TaskForm';

import './Header.scss';

export const Header = () => {
  const { addTask } = useTaskStore();
  const { columns } = useColumStore();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<TaskFormSchemaType>({
    resolver: zodResolver(TaskFormSchema),
    mode: 'onSubmit',
  });

  const useField = useFieldArray({
    name: 'subTasks',
    control,
  });

  const handleAddTask = (
    data: TaskFormSchemaType,
    onCloseModal?: () => void
  ): void => {
    addTask({
      id: Math.floor(Math.random() * 10000000).toString(),
      columnId: columns[0].id.toString(),
      title: data.title,
      description: data.description,
      subTasks: data.subTasks ?? [],
      taskType: data.taskType,
    });

    useField.remove();
    reset();
    onCloseModal?.();
  };

  return (
    <div className='header'>
      <h2 className='header-title'>Board</h2>
      <Modal>
        <Modal.Open opens='add-task'>
          <button disabled={!columns.length} className='header-button'>
            <FaPlus />
            Add Task
          </button>
        </Modal.Open>
        <Modal.Window name='add-task'>
          <AddTaskForm
            title='Add Task'
            handleSubmit={handleSubmit}
            handleClick={handleAddTask}
            register={register}
            errors={errors}
            useField={useField}
            control={control}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
};
