import { useState, type FC, type ReactNode } from 'react';
import { cn } from '../utils/cn';
import { toast } from 'sonner';
import { delay } from '@ribbon-studios/js-utils';
import { Clipboard } from 'lucide-react';
import * as styles from './Code.module.css';
import { Spinner } from './Spinner';

type Props = {
  className?: string;
  children: ReactNode;
  shell?: boolean;
};

export const Code: FC<Props> = ({ className, children, shell = false }) => {
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={cn(
        'text-left relative select-none whitespace-pre-wrap flex flex-row items-start overflow-hidden gap-2 rounded-md bg-secondary px-4 py-2 transition-colors cursor-pointer pr-10',
        styles.code,
        shell && "before:content-['$']",
        className
      )}
      onClick={async (e) => {
        setLoading(true);

        const promise = delay(window.navigator.clipboard.writeText(e.currentTarget.innerText));
        toast.promise(promise, {
          loading: 'Copying...',
          success: 'Copied to clipboard!',
          error: 'Failed to copy to clipboard',
        });

        try {
          await promise;
        } finally {
          setLoading(false);
        }
      }}
    >
      {children}
      <Spinner className="absolute right-2" loading={loading}>
        <Clipboard className="absolute right-2" />
      </Spinner>
    </div>
  );
};
