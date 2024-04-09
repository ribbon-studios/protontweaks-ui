import { type FC } from 'react';
import * as styles from './SplashPage.module.css';
import { Code } from '@/components/Code';
import { Button } from '@/components/Button';
import { CodeIcon, ExternalLink, LibraryBig } from 'lucide-react';
import { ButtonGroup } from '@/components/ButtonGroup';

export const Component: FC = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-24 gap-4 text-center mx-4">
        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold">Simplified Linux Gaming</h1>
        <h2 className={`text-4xl sm:text-5xl xl:text-6xl font-bold ${styles.rainbow}`}>Protontweaks</h2>
        <Code shell>bash -c "$(curl -fsSL {location.origin}/install.sh)"</Code>
        <div className="italic sm:max-w-lg">
          The command above will detect the available package managers on your system and provide you various options
          for installation.
        </div>
        <Button className="w-full sm:w-fit" to="/apps">
          Checkout the Tweak Database!~ ❤️🎮
        </Button>
        <h3 className={`text-2xl sm:text-3xl xl:text-4xl font-bold`}>Checkout our Repos!</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-start w-full sm:w-fit">
          <ButtonGroup
            label={
              <>
                Protontweaks
                <CodeIcon />
              </>
            }
            vertical
          >
            <Button to="https://github.com/ribbon-studios/protontweaks">
              CLI
              <ExternalLink size={20} />
            </Button>
            <Button to="https://github.com/ribbon-studios/protontweaks-ui">
              App
              <ExternalLink size={20} />
            </Button>
            <Button to="https://github.com/ribbon-studios/protontweaks-db">
              Database
              <ExternalLink size={20} />
            </Button>
          </ButtonGroup>

          <ButtonGroup
            label={
              <>
                Libraries (interact with our api!)
                <LibraryBig />
              </>
            }
            vertical
          >
            <Button to="https://github.com/ribbon-studios/protontweaks-api-rs">
              Rust
              <ExternalLink size={20} />
            </Button>
            <Button to="https://github.com/ribbon-studios/protontweaks-api-js" disabled>
              NodeJS
              <ExternalLink size={20} />
            </Button>
            <Button to="https://github.com/ribbon-studios/protontweaks-db" disabled>
              Python
              <ExternalLink size={20} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </>
  );
};
