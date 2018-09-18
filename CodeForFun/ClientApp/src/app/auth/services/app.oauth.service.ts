import { Injectable, OnDestroy } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from '../config/auth.config';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AppOAuthService implements OnDestroy {

    private _isLoggedIn$ = new BehaviorSubject(this._oauthService.hasValidAccessToken());
    private _subscriptions: Array<Subscription> = [];
    private _isInit = false;

    public discoveryDocumentLoaded$ = new Subject();

    constructor(
        private _oauthService: OAuthService,
        private _router: Router
    ) {
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(sub => !sub.closed && sub.unsubscribe());
    }

    public initialize() {
        if (this._isInit) { return; }

        this._isInit = true;
        this._oauthService.configure(authConfig);
        this._oauthService.tokenValidationHandler = new JwksValidationHandler();

        this._oauthService.loadDiscoveryDocument().then(() => {
            this.discoveryDocumentLoaded$.next();
        });

        this._subscriptions.push(
            this._oauthService.events.subscribe(event => {
                switch (event.type) {
                    case 'token_received': {
                        this._isLoggedIn$.next(this._oauthService.hasValidAccessToken());
                        this._navigateToReturnUrl();
                    }
                }
            })
        );
    }

    public get isLoggedIn$() {
        return this._isLoggedIn$.asObservable();
    }

    private _navigateToReturnUrl() {
        setTimeout(() => {
            const returnUrl = localStorage.getItem('returnUrl') || '';
            localStorage.removeItem('returnUrl');
            this._router.navigate([returnUrl]);
        }, 0);
    }
}
