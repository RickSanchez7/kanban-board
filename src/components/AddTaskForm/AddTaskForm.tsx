import { FC } from 'react';
import {
  type Control,
  Controller,
  FieldErrors,
  type UseFieldArrayReturn,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from 'react-hook-form';
import { HiXMark } from 'react-icons/hi2';
import Select, { components } from 'react-select';

import { FormRow } from '../../ui/FormRow';
import { Input } from '../../ui/Input';
import { TaskFormSchemaType } from '../../schema/TaskForm';

import './AddTaskForm.scss';
import { typeOptions } from '../../models';

interface AddTaskFormProps {
  onCloseModal?: () => void;
  handleSubmit: UseFormHandleSubmit<TaskFormSchemaType>;
  handleClick: (data: TaskFormSchemaType, onCloseModal?: () => void) => void;
  title: string;
  register: UseFormRegister<TaskFormSchemaType>;
  errors: FieldErrors<TaskFormSchemaType>;
  useField: UseFieldArrayReturn<TaskFormSchemaType>;
  control: Control<any>;
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

export const AddTaskForm: FC<AddTaskFormProps> = ({
  onCloseModal,
  handleSubmit,
  handleClick,
  title,
  register,
  errors,
  useField,
  control,
}) => {
  const { append, fields, remove } = useField;

  const handleNewSubtasks = () => {
    append({ title: '', isChecked: false });
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

  return (
    <form
      onSubmit={handleSubmit((data: TaskFormSchemaType) => {
        handleClick(data, onCloseModal);
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
                options={typeOptions}
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
      </div>
      <button type='submit' className='task-form-submit'>
        {title}
      </button>
    </form>
  );
};
