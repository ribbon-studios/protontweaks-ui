import type { SteamApp } from '@/types/steam';
import { fetch } from '@/utils/fetch';

export class SteamService {
  static async getByAppID(id: string): Promise<Record<string, SteamApp>> {
    const steamApp = await fetch<Record<string, SteamApp>>(
      `https://www.protondb.com/proxy/steam/api/appdetails/?appids=${id}`
    );

    return steamApp;
  }
}
