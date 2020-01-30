// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  languages: ['fr','en','es','ca'],
  kiiserverURL:  "http://localhost:3000",
  kiiserverExtURL: "https://localhost:4300/server",
  apiURL: "http://localhost:3000/api",
  apiExtURL: "https://localhost:4300/server/api",
  mainExtURL: "https://localhost:4300",
  vapidPublic: 'BJ2ZA-q_PZ8yCexelSbjYCtCwZw0fmYVaEQ5MLMqhR4_1DVPDHcWOC1nL0LMKavdoV9bBrCmRDUQu_z35Uk8Evs',

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
