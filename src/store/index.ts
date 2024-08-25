import { create } from 'zustand';
import { IColumn, ITask } from '../models';

interface TasksState {
  tasks: ITask[];
  addTask: (task: ITask) => void;
  setTasks: (tasks: ITask[]) => void;
}

interface ColumnState {
  columns: IColumn[];
  addColumn: (column: IColumn) => void;
  setColumns: (column: IColumn[]) => void;
}

export const useTaskStore = create<TasksState>(set => ({
  tasks: [],
  addTask: (task: ITask) => set(state => ({ tasks: [...state.tasks, task] })),
  setTasks: (tasks: ITask[]) => set(() => ({ tasks })),
}));

export const useColumStore = create<ColumnState>(set => ({
  columns: [],
  addColumn: (column: IColumn) =>
    set(state => ({ columns: [...state.columns, column] })),
  setColumns: (columns: IColumn[]) => set(() => ({ columns })),
}));
