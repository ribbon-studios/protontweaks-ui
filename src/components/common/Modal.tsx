import { useCallback, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './Button';
import { XIcon } from 'lucide-react';
import { useCachedState } from '@ribbon-studios/react-utils';
import { Backdrop } from './Backdrop';

type Props = {
  isOpen?: boolean;
  header?: string;
  children?: ReactNode;
  onOpenChanged?: (isOpen: boolean) => void;
};

export const Modal: FC<Props> = ({
  isOpen: externalIsOpen,
  header = 'Modal',
  children,
  onOpenChanged: externalOnOpenChanged,
  ...props
}) => {
  const [isOpen, setOpen] = useCachedState(() => externalIsOpen, [externalIsOpen]);

  const onOpenChanged = useCallback(
    (updatedIsOpen: boolean) => {
      setOpen(updatedIsOpen);
      externalOnOpenChanged?.(updatedIsOpen);
    },
    [externalOnOpenChanged]
  );

  return (
    isOpen &&
    createPortal(
      <>
        <Backdrop onClick={() => onOpenChanged(false)} />
        <div
          {...props}
          className="flex flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 rounded-md min-w-80"
        >
          <div className="flex items-center justify-between gap-4 border border-transparent border-b-white/10 p-4">
            <div className="text-2xl">{header}</div>
            <Button className="flex-shrink-0 bg-accent" onClick={() => onOpenChanged(false)}>
              <XIcon />
            </Button>
          </div>
          <div className="flex flex-col p-4">{children}</div>
        </div>
      </>,
      document.body
    )
  );
};
