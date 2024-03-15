import { type FC } from 'react';
import * as styles from './SplashPage.module.css';
import { Code } from '@/components/Code';
import { Button } from '@/components/Button';
import { Code2, CodeIcon, ExternalLink, LibraryBig } from 'lucide-react';
import { ButtonGroup } from '@/components/ButtonGroup';

export const Component: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-24 gap-4 text-center mx-4">
        <h1 className="text-4xl sm:text-6xl xl:text-8xl font-bold">Simplified Linux Gaming</h1>
        <h2 className={`text-4xl sm:text-5xl xl:text-7xl font-bold ${styles.rainbow}`}>Protontweaks</h2>
        <Code>curl -fsSL {location.origin}/install.sh | bash</Code>
        <div className="italic sm:max-w-lg">
          The command above will detect the available package managers on your system and provide you various options
          for installation.
        </div>
        <Button className="w-full sm:w-fit" to="/apps">
          Checkout the Tweak Database!~ ❤️🎮
        </Button>
        <ButtonGroup
          label={
            <>
              Repositories
              <CodeIcon />
            </>
          }
        >
          <Button to="https://github.com/rain-cafe/protontweaks">
            CLI
            <ExternalLink size={20} />
          </Button>
          <Button to="https://github.com/rain-cafe/protontweaks-ui">
            App
            <ExternalLink size={20} />
          </Button>
          <Button to="https://github.com/rain-cafe/protontweaks-db">
            Database
            <ExternalLink size={20} />
          </Button>
        </ButtonGroup>

        <ButtonGroup
          label={
            <>
              Libraries
              <LibraryBig />
            </>
          }
        >
          <Button to="https://github.com/rain-cafe/protontweaks-api-rs" className="justify-between">
            Rust
            <ExternalLink size={20} />
          </Button>
          <Button to="https://github.com/rain-cafe/protontweaks-api-js" className="justify-between" disabled>
            NodeJS
            <ExternalLink size={20} />
          </Button>
          <Button to="https://github.com/rain-cafe/protontweaks-db" className="justify-between" disabled>
            Python
            <ExternalLink size={20} />
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
};
