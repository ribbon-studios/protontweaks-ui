import { type FC } from 'react';
import type { LoaderFunctionArgs } from 'react-router-dom';
import { useLoaderData } from '@rain-cafe/react-utils/react-router';
import { AppImage } from '../../components/AppImage';
import { Label } from '../../components/Label';
import { Pill, appSettingStatustoVariant } from '../../components/Pill';
import { Card } from '../../components/Card';
import { Code } from '../../components/Code';
import { getApp, getAppSettingStatus } from '@/service/protontweaks';
import type { App } from '@/types';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.id) throw new Error('No app id available.');

  return await getApp(params.id);
}

export const Component: FC = () => {
  const app = useLoaderData<typeof loader>();
  const environmentVariables = Object.entries(app.tweaks.env);

  return (
    <>
      <div className="flex flex-col gap-2 items-center">
        <AppImage id={app.id} />
        <div className="text-md">
          {app.name} ({app.id})
        </div>
      </div>
      <Card>
        <Label label="Protontricks Command" />
        <Code shell>
          protontricks {app.id} {app.tweaks.tricks.join(' ')}
        </Code>
        <Label label="Launch Options" />
        <Code>
          {environmentVariables.map(([key, value]) => `${key}=${value} `).join()}
          %command%
        </Code>
      </Card>
      <Card>
        <Label label="Tricks">
          {app.tweaks.tricks.map((trick, index) => (
            <Pill key={index}>{trick}</Pill>
          ))}
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
        {(['gamemode', 'mangohud'] satisfies (keyof App['tweaks']['settings'])[]).map((key) => {
          const status = getAppSettingStatus(app, key);
          const variant = appSettingStatustoVariant(status);

          return (
            <Label label={key}>
              <Pill key={key} variant={variant}>
                {status}
              </Pill>
            </Label>
          );
        })}
      </Card>
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
