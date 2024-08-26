import { FC, type ReactElement, useState } from 'react';
import { CSS } from '@dnd-kit/utilities';
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
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
  const [titleEditMode, setTitleEditMode] = useState(false);

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
    disabled: titleEditMode,
  });
  const { tasks } = useTaskStore();
  const { deleteColumn, getColumns, setColumns } = useColumStore();

  const filteredTasks = tasks.filter(task => task.columnId === column.id);

  const tasksId = tasks.map(task => task.id);

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
        <div className='column-container'></div>
      </div>
    );
  }

  const handleTitleEdit = (columnId: string, newTitle: string) => {
    const newColumns = getColumns().map(col => {
      if (columnId === col.id) {
        return {
          ...col,
          title: newTitle,
        };
      }

      return col;
    });

    setColumns(newColumns);
  };

  return (
    <div ref={setNodeRef} style={style} className='column'>
      <div {...attributes} className='column-container'>
        <div {...listeners} className='column-title-wrapper'>
          <h3 className='column-title'>
            <FaCircle
              style={{
                color: column.color,
                fontSize: '0.8rem',
                marginRight: '0.3rem',
                height: '1.2rem',
              }}
            />
            {titleEditMode ? (
              <input
                className='column-title-input'
                value={column.title}
                onChange={e => handleTitleEdit(column.id, e.target.value)}
                autoFocus
                onKeyDown={e => {
                  if (e.key !== 'Enter') return;
                  setTitleEditMode(false);
                }}
                onBlur={() => setTitleEditMode(false)}
              />
            ) : (
              <button
                className='column-title-button'
                onClick={() => setTitleEditMode(true)}
              >{`${column.title}`}</button>
            )}
            {`(${filteredTasks.length})`}
          </h3>
          <Dropdown itemlist={itemlist} />
        </div>
        <SortableContext strategy={rectSortingStrategy} items={tasksId}>
          {filteredTasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
