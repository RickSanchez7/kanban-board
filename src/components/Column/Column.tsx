import { FC, ReactElement } from 'react';
import { IColumn } from '../../models/Column';
import { Task } from '../Task';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import './Column.scss';
import { useTaskStore } from '../../store';

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
    transition: {
      duration: 150, // milliseconds
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    },
  });
  const { tasks } = useTaskStore();

  const filteredTasks = tasks.filter(task => task.columnId === column.id);

  const tasksId = tasks.map(task => task.id);

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging && !activeColumn) {
    return (
      <div ref={setNodeRef} style={style} className='column-placeholder'>
        <div className='column-container'>
          <h3 className='column-title'>{column.title}</h3>
          {/* <Task /> */}
        </div>
      </div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className='column'>
      <div {...attributes} {...listeners} className='column-container'>
        <h3 className='column-title'>{`${column.title} (${tasks.length})`}</h3>
        <SortableContext items={tasksId}>
          {filteredTasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};
