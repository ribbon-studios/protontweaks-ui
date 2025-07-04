import { useMemo } from 'react';

export function useAppLink(id?: string): string {
  return useMemo(() => {
    if (id) {
      return `https://github.com/ribbon-studios/protontweaks-db/edit/main/apps/${id}.json`;
    }

    const url = new URL('https://github.com/ribbon-studios/protontweaks-db/new/main/apps');
    url.searchParams.set('filename', 'AppID.json');
    url.searchParams.set(
      'value',
      JSON.stringify(
        {
          id: 'AppID',
          name: 'AppName',
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
}
