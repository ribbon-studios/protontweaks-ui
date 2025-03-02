import { type FC, useEffect, useMemo, useState } from 'react';
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
  const [apps, setApps] = useState<ComputedApp<ThinApp>[]>([]);
  const filteredApps = useMemo(() => {
    // If we have a search query then display all apps
    if (search) return apps;
    // Otherwise only display the apps that aren't new
    return apps.filter((app) => !app.badges.is_new);
  }, [apps, search]);
  const recentlyUpdatedApps = useMemo(() => apps.filter((app) => app.badges.is_recently_updated), [apps]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    SearchService.query(search)
      .then(async (apps) => {
        // Preload the images to prevent content from jumping
        await ImageService.preload(...apps.map((app) => app.image_url));

        setApps(apps);
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
      <div className="flex flex-col gap-5 mx-auto">
        {!search && recentlyUpdatedApps.length > 0 && (
          <>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold">Recently Updated!</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5">
              {recentlyUpdatedApps.map((app) => (
                <AppImage key={app.id} app={app} to={`/apps/${app.id}`} />
              ))}
            </div>
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-bold">Other Apps</h1>
          </>
        )}
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
      </div>
    </PageSpinner>
  );
};
