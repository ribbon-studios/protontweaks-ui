import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AppFooter } from '@/components/layout/AppFooter';
import * as styles from './App.module.css';

export const Component: FC = () => {
  return (
    <>
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex flex-1 flex-col gap-4">
          <Outlet />
        </div>
        <AppFooter />
      </div>
      <div className={styles.background} />
      <Toaster
        toastOptions={{
          unstyled: true,
          classNames: {
            toast: 'overflow-hidden flex gap-4 items-center bg-black p-4 w-full rounded-md text-white',
            title: 'text-lg',
          },
        }}
      />
    </>
  );
};
