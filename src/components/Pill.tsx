import { AppSettingStatus } from '@/service/protontweaks';
import { cn } from '@/utils/cn';
import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  variant?: 'success' | 'error';
};

const VariantClasses: Partial<Record<NonNullable<Props['variant']>, string>> = {
  success: 'bg-emerald-600',
  error: 'bg-rose-500',
};

export const Pill: FC<Props> = ({ children, variant }) => {
  return (
    <div
      className={cn(
        'rounded-full bg-secondary px-3 min-h-10 items-center inline-flex',
        variant && VariantClasses[variant]
      )}
    >
      {children}
    </div>
  );
};

export function appSettingStatustoVariant(status: AppSettingStatus): Props['variant'] {
  if (status === AppSettingStatus.UNTESTED) return undefined;
  else if (status === AppSettingStatus.SUPPORTED) return 'success';
  else if (status === AppSettingStatus.UNSUPPORTED) return 'error';
}
