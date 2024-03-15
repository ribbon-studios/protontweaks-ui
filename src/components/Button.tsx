import { type ComponentProps, type FC, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';
import * as styles from './Button.module.css';

type SharedProps = {
  children?: ReactNode;
  className?: string;
  disabled?: boolean;
  variant?: 'slim' | 'default';
};

type LinkProps = SharedProps & {
  to: string;
  target?: ComponentProps<'a'>['target'];
};

type ButtonProps = SharedProps & {
  onClick?: () => void;
};

type Props = LinkProps | ButtonProps;

const isLink = (props: Props): props is LinkProps => {
  return Object.hasOwn(props, 'to');
};

const variantsClassnames: Partial<Record<NonNullable<SharedProps['variant']>, string>> = {
  default: 'min-h-14',
  slim: 'min-h-10',
};

export const Button: FC<Props> = ({ className: externalClassname, variant = 'default', ...props }) => {
  const className = cn(
    styles.button,
    variantsClassnames[variant],
    'flex relative gap-2 items-center justify-center min-w-14 bg-secondary border border-transparent px-3 transition-all overflow-hidden rounded-md',
    props.disabled && 'text-white/20 pointer-events-none',
    externalClassname
  );
  if (isLink(props)) {
    if (props.to.startsWith('#')) {
      return (
        <button
          {...props}
          onClick={
            props.disabled
              ? undefined
              : () => {
                  const id = props.to.replace('#', '');

                  const element = document.getElementById(id);

                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    console.warn(`Unknown ID: "${id}"`);
                  }
                }
          }
          className={className}
        />
      );
    }

    return <Link {...props} target={props.to.startsWith('http') ? '_blank' : undefined} className={className} />;
  }

  return <button {...props} className={className} />;
};
