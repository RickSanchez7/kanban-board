import { type FC, type ReactElement, type ReactNode, useRef } from 'react';
import { HiDotsVertical } from 'react-icons/hi';

import { useOutsideClick } from '../../hooks/useClickOutside';
import './Dropdown.scss';

interface DropdownProps {
  itemlist: {
    name: string;
    callback?: () => void;
    JsxElement?: ({ children }: { children: ReactElement }) => ReactNode;
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
        {itemlist.map(({ name, callback, JsxElement }) => (
          <li key={name} className='dropdown-item'>
            {JsxElement ? (
              <JsxElement>
                <button
                  className='dropdown-item-button'
                  type='button'
                  aria-label='dropdown-item-button'
                >
                  {name}
                </button>
              </JsxElement>
            ) : (
              <button
                className='dropdown-item-button'
                type='button'
                aria-label='dropdown-item-button'
                onClick={callback}
              >
                {name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
