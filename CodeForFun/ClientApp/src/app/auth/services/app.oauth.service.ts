import { Injectable, OnDestroy } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { BehaviorSubject, Subscription, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppOAuthService implements OnDestroy {

    private _isLoggedIn$ = new BehaviorSubject(this.oauthService.hasValidAccessToken());
    private _subscriptions: Array<Subscription> = [];
    private _isInit = false;

    public discoveryDocumentLoaded$ = new Subject();

    constructor(
        public oauthService: OAuthService,
        private _router: Router
    ) {
    }

    public ngOnDestroy(): void {
        this._subscriptions.forEach(sub => !sub.closed && sub.unsubscribe());
    }

    public initialize() {
        if (this._isInit) { return; }

        this._isInit = true;
        this.oauthService.configure(environment.authConfig);
        this.oauthService.tokenValidationHandler = new JwksValidationHandler();

        this.oauthService.loadDiscoveryDocument().then(() => {
            this.discoveryDocumentLoaded$.next();
        });

        this._subscriptions.push(
            this.oauthService.events.subscribe(event => {
                switch (event.type) {
                    case 'token_received': {
                        this._isLoggedIn$.next(this.oauthService.hasValidAccessToken());
                        this._navigateToReturnUrl();
                    }
                }
            }),

            this.isLoggedIn$.subscribe(isLoggedIn => {
                if (isLoggedIn) {
                    this.oauthService.setupAutomaticSilentRefresh();
                }
            })
        );
    }

    public get isLoggedIn$() {
        return this._isLoggedIn$.asObservable();
    }

    private _navigateToReturnUrl() {
        const returnUrl = localStorage.getItem('returnUrl') || '';
        localStorage.removeItem('returnUrl');
        this._router.navigate([returnUrl]);
    }
}
