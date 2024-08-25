import { FaTicket } from 'react-icons/fa6';
import { IColumn, ITask } from '../models';

export const mockTask: ITask = {
  id: '2837192',
  columnId: '5689330',
  title: 'asdf',
  description: 'description',
  subTasks: [
    { title: 'subtask 1', isChecked: false },
    { title: 'subtask 2', isChecked: false },
  ],
  taskType: {
    value: 'story',
    label: 'Story',
    Icon: FaTicket,
    style: { color: 'green' },
  },
};

export const mockColumn: IColumn = {
  id: '5689330',
  title: 'Column 1',
  color: '#49c5e5',
};
