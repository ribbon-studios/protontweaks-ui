import type { App, AppsList } from '../types';
import { fetch } from '../utils/fetch';

export async function getAppsList() {
  return await fetch<AppsList>('https://api.protontweaks.com/v3/apps.json');
}

export async function getAppRoutes() {
  const appsList = await getAppsList();

  return appsList.apps.map(({ id }) => `/apps/${id}`);
}

export async function getApps() {
  const appsList = await getAppsList();

  return appsList.apps;
}

export async function getApp(id: string) {
  return await fetch<App>(`https://api.protontweaks.com/v3/${id}.json`);
}
