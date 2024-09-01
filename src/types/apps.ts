export type ApiInfo = {
  sha: string;
  short_sha: string;
};

export type AppsList = ApiInfo & {
  apps: Pick<App, 'id' | 'name'>[];
};

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

export type ComputedApp = App & {
  image_url: string;
};
