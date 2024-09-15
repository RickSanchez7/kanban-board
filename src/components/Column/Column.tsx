import { FC, type ReactElement, useState } from 'react';
import { FaCircle } from 'react-icons/fa6';
import {
  Draggable,
  DraggableStateSnapshot,
  DraggingStyle,
  Droppable,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

import { IColumn } from '../../models/Column';
import { Task } from '../Task';
import { useColumStore, useTaskStore } from '../../store';
import { Dropdown } from '../../ui/Dropdown';

import './Column.scss';

interface ColumnProps {
  column: IColumn;
  index: number;
}

export const Column: FC<ColumnProps> = ({ column, index }): ReactElement => {
  const [titleEditMode, setTitleEditMode] = useState(false);

  const { tasks } = useTaskStore();
  const { deleteColumn, getColumns, setColumns } = useColumStore();

  const filteredTasks = tasks.filter(task => task.columnId === column.id);

  const handleDeleteCoumn = () => {
    deleteColumn(column.id);
  };

  const itemlist = [
    {
      name: 'delete',
      callback: handleDeleteCoumn,
    },
  ];

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
    <Draggable key={column.id} draggableId={column.id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className='column'
        >
          <div className='column-container'>
            <div className='column-title-wrapper'>
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
            <Droppable droppableId={column.id} type='TASK'>
              {provided => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {filteredTasks.map((task, i) => (
                    <Draggable key={task.id} draggableId={task.id} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(
                            provided.draggableProps.style,
                            snapshot
                          )}
                        >
                          <Task snapshot={snapshot} key={task.id} task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};

function getStyle(
  style: DraggingStyle | NotDraggingStyle | undefined,
  snapshot: DraggableStateSnapshot
) {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
}
