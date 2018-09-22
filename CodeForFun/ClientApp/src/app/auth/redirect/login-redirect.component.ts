import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AppOAuthService } from '../services/app.oauth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-login-redirect',
    template: ``
})
export class LoginRedirectComponent implements OnDestroy {

    private _subscriptions: Subscription[] = [];

    constructor(
        private _router: Router,
        private _appOAuthService: AppOAuthService
    ) {
        this._tryLogin();
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(sub => !sub.closed && sub.unsubscribe());
    }

    private _tryLogin() {
        if (this._hasValidAccessToken) {
            return this._navigateToHome();
        }

        this._subscriptions.push(
            this._appOAuthService.discoveryDocumentLoaded$.subscribe(() => {
                this._appOAuthService.oauthService.tryLogin().then(() => {
                    if (!this._hasValidAccessToken) {
                        return this._navigateToHome();
                    }
                });
            })
        );
    }

    private _navigateToHome() {
        this._router.navigate(['/']);
    }

    private get _hasValidAccessToken() {
        return this._appOAuthService.oauthService.hasValidAccessToken();
    }
}
