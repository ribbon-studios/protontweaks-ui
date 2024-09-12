import { type FC, useEffect, useState } from 'react';
import { useSearch } from '../../context/search';
import { AppImage } from '@/components/app/AppImage';
import { Button } from '@/components/common/Button';
import { ButtonGroup } from '@/components/common/ButtonGroup';
import type { ComputedApp, ThinApp } from '@/types';
import { PageSpinner } from '@/components/common/PageSpinner';
import { SearchService } from '@/service/search.service';
import { ImageService } from '@/service/image.service';

export const Component: FC = () => {
  const search = useSearch();
  const [filteredApps, setFilteredApps] = useState<ComputedApp<ThinApp>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    SearchService.query(search)
      .then(async (apps) => {
        // Preload the images to prevent content from jumping
        await ImageService.preload(...apps.map((app) => app.image_url));

        setFilteredApps(apps);
        setLoading(false);
      })
      .catch(({ message, debounce }) => {
        if (debounce) return;

        console.error(message);
        setLoading(false);
      });
  }, [search]);

  useEffect(() => {
    const listener = () => {};
    window.addEventListener('scroll', listener, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return (
    <PageSpinner loading={loading}>
      {filteredApps.length === 0 ? (
        <ButtonGroup className="w-fit self-center" label="Can't find the game you're looking for?" vertical>
          <Button variant="slim" to="https://github.com/ribbon-studios/protontweaks-db/tree/main/apps">
            Help us out and add it!~ ❤️
          </Button>
        </ButtonGroup>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mx-auto">
          {filteredApps.map((app) => (
            <AppImage key={app.id} app={app} to={`/apps/${app.id}`} />
          ))}
        </div>
      )}
    </PageSpinner>
  );
};
