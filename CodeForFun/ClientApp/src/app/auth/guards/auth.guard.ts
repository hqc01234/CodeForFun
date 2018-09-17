import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(
        private _oauthService: OAuthService
    ) {

    }

    public canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this._oauthService.hasValidAccessToken()) {
            return true;
        }

        // Store current url to redirect user back to this route after login redirect callback
        localStorage.setItem('returnUrl', state.url);

        return this._oauthService.loadDiscoveryDocumentAndLogin();
    }
}
