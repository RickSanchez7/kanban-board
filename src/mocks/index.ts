import { FaTicket } from 'react-icons/fa6';
import { IColumn, ITask } from '../models';
import { IUser, Positions } from '../models/Users';

export const mockColumn: IColumn = {
  id: '2433771',
  title: 'Column 1',
  color: '#49c5e5',
};

export const mockUsers: IUser[] = [
  {
    id: 'asdf-1',
    name: 'Ricardo Costa',
    position: Positions.DEVELOPER,
  },
  {
    id: 'asdf-2',
    name: 'John Doe',
    position: Positions.DEVELOPER,
  },
];

export const mockTask: ITask = {
  id: '2837192',
  columnId: '2433771',
  title: 'asdf',
  description: 'description',
  subTasks: [
    { id: 'mock-sub-task-1', title: 'subtask 1', isChecked: false },
    { id: 'mock-sub-task-2', title: 'subtask 2', isChecked: false },
  ],
  taskType: {
    value: 'story',
    label: 'Story',
    Icon: FaTicket,
    style: { color: 'green' },
  },
  assignUser: mockUsers[0],
};
