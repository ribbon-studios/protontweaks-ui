import { useState, type FC, type ReactNode, useEffect } from 'react';
import { CircleCheck, LoaderIcon } from 'lucide-react';
import { cn } from '@/utils/cn';
import { delay } from '@rain-cafe/js-utils';

type Props = {
  children: ReactNode;
  loading: boolean;
  className?: string;
};

enum LoadingState {
  NOT_STARTED,
  LOADING,
  FINISHED,
}

export const Spinner: FC<Props> = ({ children, loading, className }) => {
  const [state, setState] = useState(LoadingState.NOT_STARTED);

  useEffect(() => {
    if (loading) setState(LoadingState.LOADING);
    else if (state === LoadingState.LOADING) {
      setState(LoadingState.FINISHED);

      setTimeout(() => {
        setState(LoadingState.NOT_STARTED);
      }, 500);
    }
  }, [loading]);

  if (state === LoadingState.LOADING) return <LoaderIcon className={cn('text-white/20 animate-spin', className)} />;
  else if (state === LoadingState.FINISHED) return <CircleCheck className={className} />;
  return children;
};
