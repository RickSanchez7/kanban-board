import { create } from 'zustand';
import { IColumn, ITask } from '../models';

interface TasksState {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  deleteTask: (taskId: string) => void;
  setTasks: (tasks: ITask[]) => void;
  getTasks: () => ITask[];
}

interface ColumnState {
  columns: IColumn[];
  addColumn: (column: IColumn) => void;
  deleteColumn: (columnId: string) => void;
  setColumns: (column: IColumn[]) => void;
  getColumns: () => IColumn[];
}

export const useTaskStore = create<TasksState>((set, get) => ({
  tasks: [],
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
}));

export const useColumStore = create<ColumnState>((set, get) => ({
  columns: [],
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
