import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-redirect',
    template: ``
})
export class LoginRedirectComponent {

    constructor(
        private _oauthService: OAuthService,
        private _router: Router
    ) {
        this._tryLogin();
    }

    private _tryLogin() {
        if (this._oauthService.hasValidAccessToken()) {
            this._router.navigate(['/']);
            return;
        }

        this._oauthService.loadDiscoveryDocumentAndTryLogin();
    }
}
