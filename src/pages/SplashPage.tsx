import { type FC } from 'react';
import * as styles from './SplashPage.module.css';
import { Code } from '@/components/Code';
import { Button } from '@/components/Button';

export const Component: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-24 gap-4 text-center">
        <h1 className="text-6xl font-bold">Simplified Linux Gaming</h1>
        <h2 className={`text-5xl font-bold ${styles.rainbow}`}>Protontweaks</h2>
        <Code className="mx-4 text-left">curl -fsSL https://protontweaks.com/install.sh | bash</Code>
        <div className="italic sm:max-w-lg">
          The command above will detect the available package managers on your system and provide you various options
          for installation.
        </div>
        <div className="flex gap-4">
          <Button to="/apps">Checkout the Tweak Database!~ ❤️🎮</Button>
        </div>
      </div>
    </>
  );
};
