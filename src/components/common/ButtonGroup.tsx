import type { FC, ReactNode } from 'react';
import * as styles from './ButtonGroup.module.css';
import { cn } from '@/utils/cn';

type Props = {
  label: ReactNode;
  children: ReactNode;
  vertical?: boolean;
  className?: string;
};

export const ButtonGroup: FC<Props> = ({ label, children, vertical, className }) => {
  return (
    <div
      className={cn(
        'flex rounded-md overflow-hidden bg-secondary w-full',
        vertical ? 'flex-col' : 'flex-row',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center justify-between gap-2 p-4 whitespace-nowrap font-bold',
          vertical ? 'border-b border-b-white/10' : 'border-r border-r-white/10'
        )}
      >
        {label}
      </div>
      <div className={cn(styles.buttons, 'flex-1')}>{children}</div>
    </div>
  );
};
