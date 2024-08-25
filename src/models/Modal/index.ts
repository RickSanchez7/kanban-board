import type { ReactNode, ReactElement } from 'react';

export interface ModalProps {
  children: ReactNode;
}

export interface OpenProps {
  children: ReactElement;
  opens: string;
}

export interface WindowProps {
  children: ReactElement;
  name: string;
}
