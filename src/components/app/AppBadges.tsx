import { useMemo, type FC } from 'react';
import type { ComputedApp, ThinApp } from '@/types';
import { BadgePlus } from 'lucide-react';
import { IconTooltip } from '@/components/common/IconTooltip';
import { isAfter, parseISO, subWeeks } from 'date-fns';

type Props = {
  app: ComputedApp<ThinApp>;
};

export const AppBadges: FC<Props> = ({ app }) => {
  const isNew = useMemo(() => isAfter(parseISO(app.created_at), subWeeks(new Date(), 1)), [app.created_at]);

  if (!isNew) return null;

  return (
    <IconTooltip className="absolute top-1 right-1" icon={BadgePlus}>
      NEW!
    </IconTooltip>
  );
};
