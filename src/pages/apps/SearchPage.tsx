import { type FC, useMemo, useEffect } from 'react';
import { useLoaderData } from '@rain-cafe/react-utils/react-router';
import { useSearch } from '../../context/search';
import { AppImage } from '../../components/AppImage';
import { getApps } from '@/service/protontweaks';
import { Button } from '@/components/Button';
import { ButtonGroup } from '@/components/ButtonGroup';

export async function loader() {
  return await getApps();
}

export const Component: FC = () => {
  const apps = useLoaderData<typeof loader>();
  const search = useSearch();
  const filteredApps = useMemo(() => {
    return apps.filter((app) => app.name.toLowerCase().includes(search.toLowerCase()));
  }, [apps, search]);

  useEffect(() => {
    const listener = () => {};
    window.addEventListener('scroll', listener, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', listener);
    };
  }, []);

  return filteredApps.length === 0 ? (
    <ButtonGroup className="w-fit self-center" label="Can't find the game you're looking for?" vertical>
      <Button variant="slim" to="https://github.com/ribbon-studios/protontweaks-db/tree/main/apps">
        Help us out and add it!~ ❤️
      </Button>
    </ButtonGroup>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-5 mx-auto">
      {filteredApps.map((app) => (
        <AppImage key={app.id} id={app.id} to={`/apps/${app.id}`} />
      ))}
    </div>
  );
};
