import { useMemo, type FC } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData } from '@ribbon-studios/react-utils/react-router';
import { AppImage } from '../../components/AppImage';
import { Label } from '../../components/Label';
import { Pill, appSettingStatustoVariant } from '../../components/Pill';
import { Card } from '../../components/Card';
import { Code } from '../../components/Code';
import { getApp, getAppSettingStatus, toLaunchOptions } from '@/service/protontweaks.service';
import type { App } from '@/types';
import { Button } from '@/components/Button';
import { ButtonGroup } from '@/components/ButtonGroup';
import { ExternalLink, Link2 } from 'lucide-react';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Error('No app id available.');

  return await getApp(params.id);
}

export const Component: FC = () => {
  const app = useLoaderData<typeof loader>();
  const environmentVariables = Object.entries(app.tweaks.env);
  const launchOptions = useMemo(() => toLaunchOptions(app), [app]);

  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <AppImage app={app} />
        <div className="text-md">
          {app.name} ({app.id})
        </div>
        <ButtonGroup
          label={
            <>
              Links
              <Link2 />
            </>
          }
          className="w-fit"
          vertical
        >
          <Button to={`https://www.protondb.com/app/${app.id}`}>
            <img src="https://www.protondb.com/sites/protondb/images/site-logo.svg" className="size-7" />
            ProtonDB
            <ExternalLink size={20} />
          </Button>
          <Button to={`https://steamdb.info/app/${app.id}`}>
            <svg width="30" height="30" viewBox="0 0 128 128" className="fill-current size-5" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M63.9 0C30.5 0 3.1 11.9.1 27.1l35.6 6.7c2.9-.9 6.2-1.3 9.6-1.3l16.7-10c-.2-2.5 1.3-5.1 4.7-7.2 4.8-3.1 12.3-4.8 19.9-4.8 5.2-.1 10.5.7 15 2.2 11.2 3.8 13.7 11.1 5.7 16.3-5.1 3.3-13.3 5-21.4 4.8l-22 7.9c-.2 1.6-1.3 3.1-3.4 4.5-5.9 3.8-17.4 4.7-25.6 1.9-3.6-1.2-6-3-7-4.8L2.5 38.4c2.3 3.6 6 6.9 10.8 9.8C5 53 0 59 0 65.5c0 6.4 4.8 12.3 12.9 17.1C4.8 87.3 0 93.2 0 99.6 0 115.3 28.6 128 64 128c35.3 0 64-12.7 64-28.4 0-6.4-4.8-12.3-12.9-17 8.1-4.8 12.9-10.7 12.9-17.1 0-6.5-5-12.6-13.4-17.4 8.3-5.1 13.3-11.4 13.3-18.2 0-16.5-28.7-29.9-64-29.9zm22.8 14.2c-5.2.1-10.2 1.2-13.4 3.3-5.5 3.6-3.8 8.5 3.8 11.1 7.6 2.6 18.1 1.8 23.6-1.8s3.8-8.5-3.8-11c-3.1-1-6.7-1.5-10.2-1.5zm.3 1.7c7.4 0 13.3 2.8 13.3 6.2 0 3.4-5.9 6.2-13.3 6.2s-13.3-2.8-13.3-6.2c0-3.4 5.9-6.2 13.3-6.2zM45.3 34.4c-1.6.1-3.1.2-4.6.4l9.1 1.7a10.8 5 0 1 1-8.1 9.3l-8.9-1.7c1 .9 2.4 1.7 4.3 2.4 6.4 2.2 15.4 1.5 20-1.5s3.2-7.2-3.2-9.3c-2.6-.9-5.7-1.3-8.6-1.3zM109 51v9.3c0 11-20.2 19.9-45 19.9-24.9 0-45-8.9-45-19.9v-9.2c11.5 5.3 27.4 8.6 44.9 8.6 17.6 0 33.6-3.3 45.2-8.7zm0 34.6v8.8c0 11-20.2 19.9-45 19.9-24.9 0-45-8.9-45-19.9v-8.8c11.6 5.1 27.4 8.2 45 8.2s33.5-3.1 45-8.2z"
              ></path>
            </svg>
            SteamDB
            <ExternalLink size={20} />
          </Button>
        </ButtonGroup>
      </div>
      <Card>
        <h3 className="text-lg font-bold">Outputs</h3>
        <Label label="Protontricks Command" />
        <Code shell>
          protontricks {app.id} {app.tweaks.tricks.join(' ')}
        </Code>
        <Label label="Launch Options" />
        <Code>{launchOptions}</Code>
      </Card>
      <Card>
        <h3 className="text-lg font-bold">Inputs</h3>
        <Label label="Tricks">
          {app.tweaks.tricks.length === 0
            ? 'None'
            : app.tweaks.tricks.map((trick, index) => <Pill key={index}>{trick}</Pill>)}
        </Label>
        <Label label="Environment Variables">
          {environmentVariables.length === 0
            ? 'None'
            : environmentVariables.map(([key, value]) => (
                <Pill key={key}>
                  {key} = {typeof value === 'boolean' ? value : `"${value}"`}
                </Pill>
              ))}
        </Label>
      </Card>
      <Card>
        <h3 className="text-lg font-bold">Settings</h3>
        {(['gamemode', 'mangohud'] satisfies (keyof App['tweaks']['settings'])[]).map((key) => {
          const status = getAppSettingStatus(app, key);
          const variant = appSettingStatustoVariant(status);

          return (
            <Label label={key} key={key}>
              <Pill variant={variant}>{status}</Pill>
            </Label>
          );
        })}
      </Card>
      {app.issues.length > 0 && (
        <Card>
          <h3 className="text-lg font-bold">Issues</h3>
          <div className="flex justify-between">
            <Label label="Description" />
            <Label label="Solution" />
          </div>
          {app.issues.map((issue, index) => (
            <Label key={index} label={issue.description}>
              {issue.solution ? <Pill variant={'success'}>{issue.solution}</Pill> : 'None'}
            </Label>
          ))}
        </Card>
      )}
      {/* <Card>
        <Label label="API Info">
          <Pill>Version = V2</Pill>
        </Label>
        <Label label="HTTP">
          <Pill>
            GET {location.origin}/api/{tweak.id}.json
          </Pill>
        </Label>
        <Label label="RESPONSE">
          <Pill>JSON</Pill>
        </Label>
        <Code>{JSON.stringify(tweak, null, 8)}</Code>
      </Card> */}
    </>
  );
};
