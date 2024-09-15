import { create } from 'zustand';
import { IColumn, ITask } from '../models';
import { mockColumn, mockTask } from '../mocks';

interface TasksState {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  deleteTask: (taskId: string) => void;
  setTasks: (tasks: ITask[]) => void;
  getTasks: () => ITask[];
  updateTask: (updatedTask: ITask) => void;
}

interface ColumnState {
  columns: IColumn[];
  addColumn: (column: IColumn) => void;
  deleteColumn: (columnId: string) => void;
  setColumns: (column: IColumn[]) => void;
  getColumns: () => IColumn[];
}

export const useTaskStore = create<TasksState>((set, get) => ({
  tasks: [mockTask],
  addTask: (task: ITask) =>
    set(state => {
      const tasks = [...state.tasks, task];

      localStorage.setItem('tasks', JSON.stringify(tasks));
      return { tasks };
    }),
  deleteTask: (taskId: string) =>
    set(state => {
      const filteredTasks = state.tasks.filter(task => task.id !== taskId);

      localStorage.setItem('tasks', JSON.stringify(filteredTasks));
      return { tasks: filteredTasks };
    }),
  setTasks: (tasks: ITask[]) =>
    set(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      return { tasks };
    }),
  getTasks: () => get().tasks,
  updateTask: (updatedTask: ITask) =>
    set(state => {
      const taskIndex = state.tasks.findIndex(task => task.id === task.id);
      if (taskIndex !== -1) {
        const updatedTasks = [...state.tasks];
        updatedTasks[taskIndex] = updatedTask;
        return { tasks: updatedTasks };
      }

      // If no task is found, return the same state (no update)
      return state;
    }),
}));

export const useColumStore = create<ColumnState>((set, get) => ({
  columns: [mockColumn],
  addColumn: (column: IColumn) =>
    set(state => {
      const columns = [...state.columns, column];

      localStorage.setItem('columns', JSON.stringify(columns));
      return { columns };
    }),
  deleteColumn: (columnId: string) => {
    const tasks = useTaskStore
      .getState()
      .tasks.filter(task => task.columnId === columnId);
    tasks.forEach(task => {
      useTaskStore.getState().deleteTask(task.id);
    });

    set(state => {
      const columns = state.columns.filter(column => column.id !== columnId);

      localStorage.setItem('columns', JSON.stringify(columns));
      return { columns };
    });
  },
  setColumns: (columns: IColumn[]) =>
    set(() => {
      localStorage.setItem('columns', JSON.stringify(columns));
      return { columns };
    }),
  getColumns: () => get().columns,
}));
