import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

import { useOutsideClick } from '../../components/hooks/useClickOutside';
import type { ModalProps, OpenProps, WindowProps } from '../../models';

import './Modal.scss';

const ModalContext = createContext({
  openName: '',
  close: () => {},
  open: (_: string) => {},
});

function Modal({ children }: ModalProps) {
  const [openName, setOpenName] = useState('');

  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Window({ children, name }: WindowProps) {
  const { openName, close } = useContext(ModalContext);

  const { ref } = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className='overlay'>
      <div className='styled-modal' ref={ref}>
        <button className='modal-button' onClick={close}>
          <HiXMark />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body
  );
}

Modal.Window = Window;
Modal.Open = Open;

export { Modal };
