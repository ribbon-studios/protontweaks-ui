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
  return to ? (
    <Link className={cn(styles.appImage, className)} to={to}>
      <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/header.jpg`} />
    </Link>
  ) : (
    <img
      className={cn(styles.appImage, className)}
      src={`https://steamcdn-a.akamaihd.net/steam/apps/${id}/header.jpg`}
    />
  );
};
