import { useEffect, type FC, useState } from 'react';
import { useSearch } from '../../context/search';
import { Link, useParams } from 'react-router-dom';
import { ArrowUp, Edit } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { AppQuickEdit } from './AppEditButton';

type Props = {
  onChange?: (value: string) => void;
};

export const AppHeader: FC<Props> = ({ onChange }) => {
  const search = useSearch();
  const [sticky, setSticky] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const listener = () => {
      setSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', listener, { passive: true });

    return () => {
      window.removeEventListener('scroll', listener);
    };
  });

  return (
    <>
      <div
        className={cn(
          'fixed inset-x-0 top-0 from-zinc-950 from-30% to-transparent bg-gradient-to-b h-64 z-30 opacity-0 transition-opacity pointer-events-none',
          sticky && 'opacity-100'
        )}
      />
      <div
        className={cn(
          'flex flex-col sm:flex-row sm:items-center gap-4 px-3 sm:px-8 py-3 bg-gray-950 sticky top-0 z-50 transition-all border border-transparent border-b-white/10',
          sticky && 'sm:mx-5 sm:top-5 sm:rounded-full border-white/10'
        )}
      >
        <Link to="/apps" className="text-2xl text-center hover:text-pink-300 transition-colors" role="heading">
          Protontweaks
        </Link>
        <div className="flex flex-1 gap-4">
          <Input value={search} placeholder="Search (e.g. 'Frostpunk', 'has:tricks')" onChange={onChange} />
          <AppQuickEdit id={id} />
        </div>
      </div>
      <Button
        className={cn(
          'fixed top-28 sm:top-20 opacity-0 pointer-events-none left-1/2 -translate-x-1/2 z-40 transition-all rounded-full px-4 bg-white/80 text-black hover:bg-white',
          sticky && 'top-36 sm:top-28 opacity-100 pointer-events-auto'
        )}
        to="#root"
      >
        Back to the Top!
        <ArrowUp />
      </Button>
    </>
  );
};
