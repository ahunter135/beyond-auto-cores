/** Contains global environment settings/information. */
export interface Environment {
  /** If the App is in production mode. */
  production: boolean;

  /** The App version. */
  version: string;

  /** Contains the API server URLs. */
  servers: { [name in EnvironmentServerName]: string };

  web: string;

  /** Contains global application settings. */
  appSettings: EnvironmentAppSettings;

  sentryDsn: string;
}

/** Contains the possible environment server names. */
export type EnvironmentServerName = 'default' | 'none';

/** Contains global application settings. */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EnvironmentAppSettings {}
