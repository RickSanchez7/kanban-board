import { FC } from 'react';

import './Checkbox.scss';

interface CheckboxProps {
  id: string;
  label: string;
  isChecked: boolean;
  toggleCheckbox: (id: string) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  label,
  isChecked,
  toggleCheckbox,
}) => {
  return (
    <label className='checkbox-container'>
      <input
        onChange={() => toggleCheckbox(id)}
        checked={isChecked}
        type='checkbox'
      />
      <span className={`label-title ${isChecked ? 'line-through' : ''}`}>
        {label}
      </span>
    </label>
  );
};
