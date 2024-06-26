import { type FC, useEffect, useState } from 'react';
import { useSearch } from '../../context/search';
import { AppImage } from '../../components/AppImage';
import { Button } from '@/components/Button';
import { ButtonGroup } from '@/components/ButtonGroup';
import type { App } from '@/types';
import { PageSpinner } from '@/components/PageSpinner';
import { SearchService } from '@/service/search';

export const Component: FC = () => {
  const search = useSearch();
  const [filteredApps, setFilteredApps] = useState<App[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    SearchService.query(search)
      .then((apps) => {
        setFilteredApps(apps);
      })
      .finally(() => {
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
