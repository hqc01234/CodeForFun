import { AuthConfig } from 'angular-oauth2-oidc';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'https://localhost:5001',

    authConfig: {
        // Url of the Identity Provider
        issuer: 'https://localhost:5003',

        // URL of the SPA to redirect the user to after login
        redirectUri: window.location.origin + '/login-callback',

        postLogoutRedirectUri: window.location.origin,

        // URL of the SPA to redirect the user after silent refresh
        silentRefreshRedirectUri: window.location.origin + '/silent-refresh.html',

        // The SPA's id. The SPA is registerd with this id at the auth-server
        clientId: 'codeforfun_angular',

        // set the scope for the permissions the client should request
        // The first three are defined by OIDC. The 4th is a usecase-specific one
        scope: 'openid profile email codeforfun',

        silentRefreshShowIFrame: false,

        showDebugInformation: true,

        sessionChecksEnabled: false
    } as AuthConfig
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
