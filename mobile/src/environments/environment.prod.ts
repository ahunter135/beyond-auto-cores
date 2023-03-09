// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  /** The App version. */
  version: '0.0.19',

  /** Contains the API server URLs. */
  servers: {
    none: '', // for calling api without servername need
    default: 'https://bac-api.azurewebsites.net/api/v1'
  },

  /** Marketing website link */
  signUpUrl: 'https://catalyticmastermind.com/#work3',
  signInUrl: 'https://catalyticmastermind.com/login',
  web: '',
  appSettings: {},
};
