import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import * as styles from './AppImage.module.css';
import type { ComputedApp, ThinApp } from '@/types';
import { NewAppBadge } from './NewAppBadge';

type Props = {
  className?: string;
  app: ComputedApp<ThinApp>;
  to?: string;
};

export const AppImage: FC<Props> = ({ className, app, to }) => {
  return to ? (
    <Link className={cn(styles.appImage, 'group', className)} to={to}>
      <NewAppBadge app={app} />
      <div className="absolute inset-0 overflow-hidden flex flex-col justify-end">
        <div className={styles.name}>{app.name}</div>
      </div>
      <img src={app.image_url} />
      <img
        className="blur-none group-hover:blur group-focus:blur absolute inset-0 -z-10 transition-all"
        src={app.image_url}
      />
    </Link>
  ) : (
    <div className={cn(styles.appImage, className)}>
      <NewAppBadge app={app} />
      <img src={app.image_url} />
      <img className="blur-sm opacity-80 absolute inset-0 -z-10 transition-all" src={app.image_url} />
    </div>
  );
};
