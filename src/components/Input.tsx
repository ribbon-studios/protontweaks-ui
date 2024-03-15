import { type FC, type ComponentProps } from 'react';
import { cn } from '../utils/cn';
import * as styles from './Input.module.css';

type Props = {
  onChange?: (value: string) => void;
} & Pick<ComponentProps<'input'>, 'value' | 'placeholder' | 'disabled'>;

export const Input: FC<Props> = ({ onChange, ...props }) => {
  return (
    <div
      className={cn(styles.input, 'flex-1 bg-accent rounded-md min-h-12 text-xl', props.disabled && styles.disabled)}
    >
      <input
        {...props}
        type="text"
        className={cn('h-full w-full bg-transparent px-3 rounded-md')}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};
