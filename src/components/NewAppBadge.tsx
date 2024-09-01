import { useMemo, type FC } from 'react';
import type { App } from '@/types';
import { BadgePlus } from 'lucide-react';
import { IconTooltip } from './IconTooltip';
import { isAfter, parseISO, subWeeks } from 'date-fns';

type Props = {
  app: App;
};

export const NewAppBadge: FC<Props> = ({ app }) => {
  const isNew = useMemo(() => isAfter(parseISO(app.created_at), subWeeks(new Date(), 1)), [app.created_at]);

  if (!isNew) return null;

  return (
    <IconTooltip className="absolute top-1 right-1" icon={BadgePlus}>
      NEW!
    </IconTooltip>
  );
};
