import { FaPlus } from 'react-icons/fa6';

import { Modal } from '../../ui/Modal';
import { CreateTaskForm } from '../CreateTaskForm';
import { useColumStore } from '../../store';

import './Header.scss';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { columns } = useColumStore();
  const { pathname } = useLocation();

  const headerName = pathname.split('/')[1];

  return (
    <div className='header'>
      <h2 className='header-title'>{headerName}</h2>
      {headerName === 'dashboard' && (
        <Modal>
          <Modal.Open opens='add-task'>
            <button disabled={!columns.length} className='header-button'>
              <FaPlus />
              Add Task
            </button>
          </Modal.Open>
          <Modal.Window name='add-task'>
            <CreateTaskForm title='Add Task' />
          </Modal.Window>
        </Modal>
      )}
    </div>
  );
};
