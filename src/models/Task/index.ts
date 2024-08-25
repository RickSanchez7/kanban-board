import { FaBug, FaTicket, FaJira } from 'react-icons/fa6';
import { BiTask } from 'react-icons/bi';
import { GiPlainCircle } from 'react-icons/gi';

export interface ITask {
  id: string;
  columnId: string;
  title: string;
  description: string;
  subTasks: ISubTask[];
  taskType: {
    value: string;
    label: string;
    Icon: unknown;
    style: { color: string };
  };
}

interface ISubTask {
  title: string;
  isChecked: boolean;
}

export const enum TaskTypes {
  BUF_FIX = 'bugFix',
  TASK = 'task',
  STORY = 'story',
  EPIC = 'epic',
  INCIDENT = 'incident',
}

export const typeOptions = [
  {
    value: 'incident',
    label: 'Incident',
    Icon: GiPlainCircle,
    style: { color: 'red' },
  },
  {
    value: 'epic',
    label: 'Epic',
    Icon: FaJira,
    style: { color: 'yellow' },
  },
  {
    value: 'task',
    label: 'Task',
    Icon: BiTask,
    style: { color: 'blue' },
  },
  {
    value: 'story',
    label: 'Story',
    Icon: FaTicket,
    style: { color: 'green' },
  },
  {
    value: 'bugFix',
    label: 'Bug Fix',
    Icon: FaBug,
    style: { color: 'red' },
  },
];
