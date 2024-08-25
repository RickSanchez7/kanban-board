import { FC, useRef } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

import './Dropdown.scss';
import { useOutsideClick } from '../../hooks/useClickOutside';

interface DropdownProps {
  itemlist: {
    name: string;
    callback: () => void;
  }[];
}

export const Dropdown: FC<DropdownProps> = ({ itemlist }) => {
  const dropdownRef = useRef<HTMLUListElement>(null);

  const toggleDropdown = () => {
    dropdownRef.current?.classList.toggle('show');
  };

  const closeDropDown = () => {
    dropdownRef.current?.classList.remove('show');
  };

  const { ref } = useOutsideClick(closeDropDown);

  return (
    <div className='dropdown'>
      <button
        ref={ref}
        type='button'
        className='dropdown-toggle'
        aria-label='dropdown-button'
        onClick={e => {
          e.stopPropagation();
          toggleDropdown();
        }}
      >
        <HiDotsVertical />
      </button>
      <ul ref={dropdownRef} className='dropdown-menu'>
        {itemlist.map(item => (
          <li key={item.name} className='dropdown-item'>
            <button
              className='dropdown-item-button'
              type='button'
              aria-label='dropdown-item-button'
              onClick={item.callback}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
