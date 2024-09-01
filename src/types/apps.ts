export type ApiInfo = {
  sha: string;
  short_sha: string;
};

export type AppsList = ApiInfo & {
  apps: ThinApp[];
};

export type ThinApp = Pick<App, 'id' | 'name' | 'created_at' | 'updated_at'>;

export type App = {
  id: string;
  name: string;
  tweaks: {
    tricks: string[];
    env: Record<string, string>;
    args: string[];
    settings: {
      gamemode?: boolean;
      mangohud?: boolean;
    };
  };
  issues: {
    solution: string | null;
    description: string;
  }[];
  created_at: string;
  updated_at: string;
};

export type ComputedApp<T extends ThinApp = App> = T & {
  image_url: string;
};
