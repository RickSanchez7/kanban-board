import { FC } from 'react';

import './Input.scss';

interface InputProps {
  type: string;
  id: string;
  name: string;
  register: any;
}

export const Input: FC<InputProps> = ({
  type = 'text',
  id,
  name,
  register,
}) => {
  return (
    <input className='input' type={type} id={id} name={name} {...register} />
  );
};
