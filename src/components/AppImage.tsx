import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import * as styles from './AppImage.module.css';
import type { App } from '@/types';

type Props = {
  className?: string;
  app: App;
  to?: string;
};

export const AppImage: FC<Props> = ({ className, app, to }) => {
  const url = `https://steamcdn-a.akamaihd.net/steam/apps/${app.id}/header.jpg`;

  return to ? (
    <Link className={cn(styles.appImage, 'group', className)} to={to}>
      <div className="absolute inset-0 overflow-hidden flex flex-col justify-end">
        <div className={styles.name}>{app.name}</div>
      </div>
      <img src={url} />
      <img className="blur-none group-hover:blur absolute inset-0 -z-10 transition-all" src={url} />
    </Link>
  ) : (
    <div className={cn(styles.appImage, className)}>
      <img src={url} />
      <img className="blur-sm opacity-80 absolute inset-0 -z-10 transition-all" src={url} />
    </div>
  );
};
