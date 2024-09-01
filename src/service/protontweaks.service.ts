import type { ApiInfo, App, AppsList } from '../types';
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

  return appsList.apps;
}

export async function getApp(id: string) {
  return await fetch<App>(`https://api.protontweaks.com/v4/${id}.json`);
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
