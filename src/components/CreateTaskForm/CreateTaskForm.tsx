import { FC } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiXMark } from 'react-icons/hi2';
import Select, { components } from 'react-select';

import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { TaskFormSchema, TaskFormSchemaType } from '../../schema/TaskForm';
import { ITask, typeOptions } from '../../models';
import { useColumStore, useTaskStore } from '../../store';
import { useUsersStore } from '../../store/Users';

import './CreateTaskForm.scss';

interface CreateTaskFormProps {
  onCloseModal?: () => void;
  title: string;
  task?: ITask;
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    backgroundColor: '$main',
    height: 30,
  }),
  option: (provided: any) => ({
    ...provided,
    color: '#fff',
    backgroundColor: '#2c2c38',
    cursor: 'pointer',
    ':hover': {
      opacity: '0.7',
    },
  }),
};

export const CreateTaskForm: FC<CreateTaskFormProps> = ({
  onCloseModal,
  title,
  task,
}) => {
  const { addTask, updateTask } = useTaskStore();
  const { columns } = useColumStore();
  const { getUsers } = useUsersStore();

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<TaskFormSchemaType>({
    resolver: zodResolver(TaskFormSchema),
    mode: 'onSubmit',
    defaultValues: task?.id
      ? {
          ...task,
          taskType: {
            ...task.taskType,
            Icon: task.taskType.Icon as any,
          },
          ...(task.assignUser && {
            assignUser: {
              id: task.assignUser?.id,
              name: task.assignUser?.name,
              position: task.assignUser?.position,
              label: `${task.assignUser.name} (${task.assignUser.position})`,
              value: task.assignUser.name,
            },
          }),
        }
      : {},
  });

  const useField = useFieldArray({
    name: 'subTasks',
    control,
  });
  const { append, fields, remove } = useField;

  const handleCreateTask = (
    data: TaskFormSchemaType,
    onCloseModal?: () => void
  ): void => {
    if (task?.id) {
      updateTask({
        ...data,
        id: task.id,
        columnId: task.columnId,
        subTasks: data.subTasks ?? [],
        assignUser: data.assignUser ?? undefined,
      });
    } else {
      addTask({
        id: Math.floor(Math.random() * 10000000).toString(),
        columnId: columns[0].id.toString(),
        title: data.title,
        description: data.description,
        subTasks: data.subTasks ?? [],
        taskType: data.taskType,
        assignUser: data.assignUser ?? undefined,
      });
    }

    useField.remove();
    reset();
    onCloseModal?.();
  };

  const handleNewSubtasks = () => {
    append({
      id: Math.floor(Math.random() * 10000000).toString(),
      title: '',
      isChecked: false,
    });
  };

  const handleDeleteSubtasks = (i: number) => {
    remove(i);
  };

  const CustomOption = (props: any) => {
    return (
      <components.Option {...props}>
        <div key={props.data.label} className='icon-container'>
          <props.data.Icon style={props.data.style} /> {props.data.label}
        </div>
      </components.Option>
    );
  };

  const CustomSingleValue = ({ data, ...props }: any) => (
    <components.SingleValue {...props}>
      <div key={data.label} className='icon-container'>
        <data.Icon style={data.style} /> {data.label}
      </div>
    </components.SingleValue>
  );

  const users = getUsers().map(user => ({
    ...user,
    label: `${user.name} (${user.position})`,
    value: user.name,
  }));

  const CustomOptionUsers = (props: any) => {
    return (
      <components.Option {...props}>
        <div key={props.data.label} className='icon-container'>
          {props.data.label}
        </div>
      </components.Option>
    );
  };

  const CustomSingleValueUsers = ({ data, ...props }: any) => (
    <components.SingleValue {...props}>
      <div key={data.label} className='icon-container'>
        {data.label}
      </div>
    </components.SingleValue>
  );

  return (
    <form
      onSubmit={handleSubmit((data: TaskFormSchemaType) => {
        handleCreateTask(data, onCloseModal);
      })}
      className='task-form'
    >
      <h3 className='task-form-title'>{title}</h3>
      <div className='task-form-row'>
        <FormRow label='Title' error={errors.title?.message} id='title'>
          <Input
            register={register('title')}
            type='text'
            id='title'
            name='title'
          />
        </FormRow>
        <FormRow
          label='Description'
          error={errors.description?.message}
          id='description'
        >
          <Input
            register={register('description')}
            type='text'
            id='description'
            name='description'
          />
        </FormRow>
        <FormRow
          label='Subtasks'
          error={errors.description?.message}
          id='subTasks'
        >
          {fields.map((field, i) => {
            return (
              <div key={field.id} className='task-form-row-subtasks'>
                <Input
                  key={field.id}
                  register={register(`subTasks.${i}.title`)}
                  type='text'
                  id='subTasks'
                  name='subTasks'
                />
                <button onClick={() => handleDeleteSubtasks(i)}>
                  <HiXMark />
                </button>
              </div>
            );
          })}
          <button
            type='button'
            onClick={handleNewSubtasks}
            className='task-form-button'
          >
            Add Subtask
          </button>
        </FormRow>
        <FormRow label='Type' id='taskType' error={errors.taskType?.message}>
          <Controller
            control={control}
            name='taskType'
            render={({ field: { onChange, name, value } }) => (
              <Select
                styles={customStyles}
                menuPlacement='top'
                options={typeOptions as any}
                value={value}
                name={name}
                onChange={onChange}
                components={{
                  Option: CustomOption,
                  SingleValue: CustomSingleValue,
                }}
              />
            )}
          />
        </FormRow>
        <FormRow
          label='Users'
          id='assignUser'
          error={errors.assignUser?.message}
        >
          <Controller
            control={control}
            name='assignUser'
            render={({ field: { onChange, name, value } }) => (
              <Select
                styles={customStyles}
                menuPlacement='top'
                options={users}
                isClearable={true}
                value={value}
                name={name}
                onChange={onChange}
                components={{
                  Option: CustomOptionUsers,
                  SingleValue: CustomSingleValueUsers,
                }}
              />
            )}
          />
        </FormRow>
      </div>
      <button type='submit' className='task-form-submit'>
        {title}
      </button>
    </form>
  );
};
