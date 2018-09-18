import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { AppOAuthService } from '../services/app.oauth.service';

@Component({
    selector: 'app-login-redirect',
    template: ``
})
export class LoginRedirectComponent {

    constructor(
        private _oauthService: OAuthService,
        private _router: Router,
        private _appOAuthService: AppOAuthService
    ) {
        this._tryLogin();
    }

    private _tryLogin() {
        if (this._hasValidAccessToken) {
            return this._navigateToHome();
        }

        this._appOAuthService.discoveryDocumentLoaded$.subscribe(() => {
            this._oauthService.tryLogin().then(() => {
                if (!this._hasValidAccessToken) {
                    return this._navigateToHome();
                }
            });
        });
    }

    private _navigateToHome() {
        this._router.navigate(['/']);
    }

    private get _hasValidAccessToken() {
        return this._oauthService.hasValidAccessToken();
    }
}
