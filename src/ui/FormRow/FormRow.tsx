import { FC, ReactNode } from 'react';

import './FormRow.scss';

interface FormRowProps {
  label: string;
  error: string | undefined;
  id: string;
  children: ReactNode;
}

export const FormRow: FC<FormRowProps> = ({ label, error, id, children }) => {
  return (
    <div className='form-row'>
      {label && (
        <label className='form-row-label' htmlFor={id}>
          {label}
        </label>
      )}
      {children}
      {error && <span className='form-row-error'>{error}</span>}
    </div>
  );
};
