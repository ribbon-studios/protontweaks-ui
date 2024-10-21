import { isAfter, parseISO, subWeeks } from 'date-fns';
import type { ApiInfo, App, AppsList, ComputedApp, ThinApp } from '../types';
import { fetch } from '../utils/fetch';

export async function getApiInfo() {
  return await fetch<ApiInfo>('https://api.protontweaks.com/v4/info.json');
}

export async function getAppsList() {
  return await fetch<AppsList>('https://api.protontweaks.com/v4/apps.json');
}

export async function getAppRoutes() {
  const appsList = await getAppsList();

  return appsList.apps.map(({ id }) => `/apps/${id}`);
}

export async function getApps() {
  const appsList = await getAppsList();

  return appsList.apps.map(getComputedApp);
}

export async function getApp(id: string) {
  return getComputedApp(await fetch<App>(`https://api.protontweaks.com/v4/${id}.json`));
}

export function getComputedApp<T extends Omit<ThinApp, 'has'>>(app: T): ComputedApp<T> {
  return {
    ...app,
    image_url: `https://steamcdn-a.akamaihd.net/steam/apps/${app.id}/header.jpg`,
    badges: {
      is_new: isAfter(parseISO(app.created_at), subWeeks(new Date(), 1)),
    },
  };
}

export enum AppSettingStatus {
  UNTESTED = 'untested',
  SUPPORTED = 'supported',
  UNSUPPORTED = 'unsupported',
}

export function getAppSettingStatus(app: App, key: keyof App['tweaks']['settings']) {
  const value = app.tweaks.settings[key];

  if (value === undefined) return AppSettingStatus.UNTESTED;

  return value ? AppSettingStatus.SUPPORTED : AppSettingStatus.UNSUPPORTED;
}

export function toLaunchOptions(app: App) {
  const environmentVariables = Object.entries(app.tweaks.env);

  const launchOptions = [];

  launchOptions.push(...environmentVariables.map(([key, value]) => `${key}="${value}"`));
  launchOptions.push('%command%');
  launchOptions.push(...app.tweaks.args);

  return launchOptions.join(' ');
}
