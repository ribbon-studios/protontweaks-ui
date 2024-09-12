import { type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
};

export const Modal: FC<Props> = ({ ...props }) => {
  return createPortal(<div {...props} className=""></div>, document.body);
};
