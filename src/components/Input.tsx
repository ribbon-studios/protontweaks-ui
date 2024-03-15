import { type FC, type ComponentProps } from 'react';
import { cn } from '../utils/cn';
import { X } from 'lucide-react';
import { useCachedState } from '@rain-cafe/react-utils';

type Props = {
  onChange?: (value: string) => void;
} & Pick<ComponentProps<'input'>, 'value' | 'placeholder' | 'disabled'>;

export const Input: FC<Props> = ({ onChange: externalOnChange, value: externalValue, ...props }) => {
  const [value, setValue] = useCachedState(() => externalValue, [externalValue]);

  const onChange = (value: string) => {
    setValue(value);
    externalOnChange?.(value);
  };

  return (
    <div className={'relative flex-1 min-h-12 bg-accent rounded-md overflow-hidden'}>
      <input
        {...props}
        type="text"
        className={cn(
          'h-full w-full bg-transparent px-3 text-xl transition-all',
          props.disabled ? 'text-white/20 pointer-events-none' : 'hover:bg-white/10'
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className={cn(
          'absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 p-1 pointer-events-none opacity-0 transition-opacity',
          value && 'pointer-events-auto opacity-100'
        )}
        onClick={() => onChange('')}
      >
        <X />
      </button>
    </div>
  );
};
