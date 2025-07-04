import { useMemo, type FC } from 'react';
import { Edit } from 'lucide-react';
import { Button } from '../common/Button';

type Props = {
  id?: string;
};

export const AppQuickEdit: FC<Props> = ({ id }) => {
  const to = useMemo(() => {
    if (id) {
      return `https://github.com/ribbon-studios/protontweaks-db/edit/main/apps/${id}.json`;
    }

    const url = new URL('https://github.com/ribbon-studios/protontweaks-db/new/main/apps');
    url.searchParams.set('filename', '<app-id>.json');
    url.searchParams.set(
      'value',
      JSON.stringify(
        {
          id: '<app-id>',
          name: '<app-name>',
          tweaks: {
            tricks: [],
            env: {},
            args: [],
            settings: {
              gamemode: true,
              mangohud: true,
            },
            system: {
              gpu_driver: {},
            },
          },
          issues: [],
        },
        undefined,
        2
      )
    );

    return url.toString();
  }, [id]);

  return (
    <Button className="flex-shrink-0 bg-accent" to={to}>
      <Edit />
    </Button>
  );
};
