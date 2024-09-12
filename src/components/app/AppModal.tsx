import { useEffect, useState, type ComponentProps, type FC } from 'react';
import { Modal } from '../common/Modal';
import type { App, SteamApp } from '@/types';
import { Input } from '../common/Input';
import { SteamService } from '@/service/steam.service';

type Props = Pick<ComponentProps<typeof Modal>, 'onOpenChanged' | 'isOpen'> & {
  app?: App;
};

export const AppModal: FC<Props> = ({ app, ...props }) => {
  const [appID, setAppID] = useState<string>('');
  const [steamApp, setSteamApp] = useState<SteamApp>();

  useEffect(() => {
    setSteamApp(undefined);

    if (!appID) return;

    SteamService.getByAppID(appID).then((steamApps) => setSteamApp(steamApps[appID]));
  }, [appID]);

  return (
    <Modal {...props} header="Create a New App">
      <Input placeholder="Steam App ID" value={appID} onChange={setAppID} />
    </Modal>
  );
};
