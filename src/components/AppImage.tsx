import { type FC } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import * as styles from './AppImage.module.css';

type Props = {
  className?: string;
  id: string;
  to?: string;
};

export const AppImage: FC<Props> = ({ className, id, to }) => {
  const url = `https://steamcdn-a.akamaihd.net/steam/apps/${id}/header.jpg`;

  return to ? (
    <Link className={cn(styles.appImage, 'group', className)} to={to}>
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
