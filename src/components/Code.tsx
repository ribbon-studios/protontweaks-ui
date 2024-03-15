import type { FC, ReactNode } from 'react';
import { cn } from '../utils/cn';
import { toast } from 'sonner';
import { delay } from '@rain-cafe/js-utils';
import { Clipboard } from 'lucide-react';

type Props = {
  className?: string;
  children: ReactNode;
  shell?: boolean;
};

export const Code: FC<Props> = ({ className, children, shell = false }) => {
  return (
    <div
      className={cn(
        'text-left relative select-none whitespace-pre-wrap flex flex-row items-start gap-2 rounded-md bg-white/10 px-4 py-2 hover:bg-white/20 transition-colors cursor-pointer pr-10',
        shell && "before:content-['$']",
        className
      )}
      onClick={(e) => {
        toast.promise(delay(window.navigator.clipboard.writeText(e.currentTarget.innerText)), {
          loading: 'Copying...',
          success: 'Copied to clipboard!',
          error: 'Failed to copy to clipboard',
        });
      }}
    >
      {children}
      <Clipboard className="absolute right-2" />
    </div>
  );
};
