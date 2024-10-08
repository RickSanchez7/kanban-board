import { useLayoutEffect } from 'react';
import { FaCirclePlus } from 'react-icons/fa6';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { Column } from '../../components/Column';
import { useColumStore, useTaskStore } from '../../store';

import './Board.scss';

// Reorder function for reordering the array
const reorder = <T,>(list: T[], startIndex: number, endIndex: number): T[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const Board = () => {
  const { columns, addColumn, setColumns } = useColumStore();

  const { tasks, setTasks } = useTaskStore();

  useLayoutEffect(() => {
    try {
      const localTasks = localStorage.getItem('tasks');
      const localColumns = localStorage.getItem('columns');
      if (localTasks) {
        const parsedTasks = JSON.parse(localTasks);
        setTasks(parsedTasks);
      }
      if (localColumns) {
        const parsedColumns = JSON.parse(localColumns);
        setColumns(parsedColumns);
      }
    } catch {
      console.error('error retriving from local storage');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColumn = () => {
    const colors = ['#49c5e5', '#8672f6', '#6adeac', 'yellow', 'purple'];

    const newColumn = {
      id: Math.floor(Math.random() * 10000000).toString(),
      title: `Column ${columns.length + 1}`,
      color: colors[columns.length % colors.length],
    };

    addColumn(newColumn);
  };

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    // Dropped outside the list
    if (!destination) {
      return;
    }

    if (type === 'COLUMN') {
      const reorderedColumns = reorder(
        columns,
        source.index,
        destination.index
      );
      setColumns(reorderedColumns);
    } else {
      const startColumnId = source.droppableId;
      const endColumnId = destination.droppableId;

      if (startColumnId === endColumnId) {
        // Reordering within the same column
        const columnTasks = tasks.filter(
          task => task.columnId === startColumnId
        );
        const reorderedTasks = reorder(
          columnTasks,
          source.index,
          destination.index
        );

        setTasks([
          ...tasks.filter(task => task.columnId !== startColumnId),
          ...reorderedTasks,
        ]);
      } else {
        // Moving task to a different column
        const movedTask = tasks.find(task => task.id === result.draggableId);
        setTasks(
          tasks.map(task =>
            task.id === movedTask?.id
              ? { ...task, columnId: endColumnId }
              : task
          )
        );
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='board' direction='horizontal' type='COLUMN'>
        {provided => (
          <div
            className='board'
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {columns.map((column, index) => (
              <Column index={index} key={column.id} column={column} />
            ))}
            {provided.placeholder}
            <div className='button-container'>
              <button className='add-column' onClick={handleColumn}>
                <FaCirclePlus />
                Add column
              </button>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
