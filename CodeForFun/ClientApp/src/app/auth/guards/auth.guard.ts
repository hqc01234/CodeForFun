import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppOAuthService } from '../services/app.oauth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivateChild {

    constructor(
        private _appOAuthService: AppOAuthService
    ) {
    }

    public canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this._appOAuthService.oauthService.hasValidAccessToken()) {
            return true;
        }

        // Store current url to redirect user back to this route after login redirect callback
        localStorage.setItem('returnUrl', state.url);

        return this._appOAuthService.discoveryDocumentLoaded$.pipe(
            switchMap(() => {
                return Observable.create(() => {
                    this._appOAuthService.oauthService.initImplicitFlowInternal();
                    return false;
                });
            })
        );
    }
}
