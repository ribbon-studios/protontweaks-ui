import { type FC, type ReactNode } from 'react';
import { cn } from '@/utils/cn';
import * as styles from './PageSpinner.module.css';

type Props = {
  children: ReactNode;
  loading: boolean;
  className?: string;
};

export const PageSpinner: FC<Props> = ({ children, loading, className }) => {
  if (loading) {
    return (
      <div className={cn('flex gap-2 justify-center', styles.spinner, className)}>
        <div />
        <div />
        <div />
      </div>
    );
  }

  return children;
};
