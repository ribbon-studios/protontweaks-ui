import { type ComponentProps, type FC } from 'react';

export const Backdrop: FC<ComponentProps<'div'>> = (props) => {
  return <div {...props} className="fixed inset-0 bg-black/50" />;
};
