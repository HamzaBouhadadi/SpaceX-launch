// src/types/launch.ts
export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    date_unix: number;
    success: boolean;
    details: string | null;
    links: {
      patch: {
        small: string | null;
        large: string | null;
      };
      article: string | null;
      webcast: string | null;
      youtube_id: string | null;
    };
    launchpad: string;
    payloads: string[];
    cores: {
      core: string;
      flight: number;
      landing_success: boolean | null;
    }[];
  }
  
  export interface Payload {
    id: string;
    name: string;
    customers: string[];
  }
  
  export interface Launchpad {
    id: string;
    name: string;
    full_name: string;
  }