import { type FC } from 'react';
import type { ComputedApp, ThinApp } from '@/types';
import { BadgePlus } from 'lucide-react';
import { IconTooltip } from '@/components/common/IconTooltip';

type Props = {
  app: ComputedApp<ThinApp>;
};

export const AppBadges: FC<Props> = ({ app }) => {
  if (app.badges.is_new) {
    return (
      <IconTooltip className="absolute top-1 right-1" icon={BadgePlus}>
        NEW!
      </IconTooltip>
    );
  }

  return null;
};
