import { FC, ReactElement } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { FaCircle } from 'react-icons/fa6';

import { IColumn } from '../../models/Column';
import { Task } from '../Task';
import { useColumStore, useTaskStore } from '../../store';
import { Dropdown } from '../../ui/Dropdown';

import './Column.scss';

interface ColumnProps {
  column: IColumn;
  activeColumn?: boolean;
}

export const Column: FC<ColumnProps> = ({
  column,
  activeColumn,
}): ReactElement => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: 'column',
      column,
    },
  });
  const { tasks } = useTaskStore();
  const { deleteColumn } = useColumStore();

  const filteredTasks = tasks.filter(task => task.columnId === column.id);

  const tasksId = filteredTasks.map(task => task.id);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleDeleteCoumn = () => {
    deleteColumn(column.id);
  };

  const itemlist = [
    {
      name: 'delete',
      callback: handleDeleteCoumn,
    },
  ];

  if (isDragging && !activeColumn) {
    return (
      <div ref={setNodeRef} style={style} className='column-placeholder'>
        <div className='column-container'>
          <h3 className='column-title'>{column.title}</h3>
        </div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className='column'>
      <div {...attributes} {...listeners} className='column-container'>
        <div className='column-title-wrapper'>
          <h3 className='column-title'>
            <FaCircle
              style={{
                color: column.color,
                fontSize: '0.8rem',
                marginRight: '0.5rem',
                height: '1.2rem',
              }}
            />
            {`${column.title} (${filteredTasks.length})`}
          </h3>
          <Dropdown itemlist={itemlist} />
        </div>
        <SortableContext items={tasksId}>
          {filteredTasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
