import type { FC, ReactNode } from 'react';
import * as styles from './ButtonGroup.module.css';
import { cn } from '@/utils/cn';

type Props = {
  label: ReactNode;
  children: ReactNode;
  vertical?: boolean;
};

export const ButtonGroup: FC<Props> = ({ label, children, vertical }) => {
  return (
    <div className="flex flex-col rounded-md overflow-hidden bg-secondary w-full sm:max-w-80">
      <div className="flex items-center justify-between gap-2 p-4 border-b border-b-white/10 font-bold">{label}</div>
      <div className={cn(styles.buttons, vertical && styles.vertical)}>{children}</div>
    </div>
  );
};
