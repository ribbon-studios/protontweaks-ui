import { type FC } from 'react';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

type Props = {
  icon: LucideIcon;
  children: string;
  className?: string;
};

export const IconTooltip: FC<Props> = ({ icon: Icon, children, className }) => {
  return (
    <div
      className={cn(
        'relative flex gap-2 p-1 pl-2 bg-blue-700/90 rounded-full transition-all group overflow-hidden z-10 font-bold italic',
        className
      )}
    >
      {children}
      <Icon />
    </div>
  );
};
