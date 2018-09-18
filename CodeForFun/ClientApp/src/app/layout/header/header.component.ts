import { Component, ChangeDetectionStrategy } from '@angular/core';
import { LayoutService } from '../services/layout.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    constructor(
        private _layoutService: LayoutService,
        private _oauthService: OAuthService
    ) {
    }

    public toggleSideNav() {
        this._layoutService.isSideNavMini$.next(!this._layoutService.isSideNavMini$.value);
    }

    public signOut() {
        this._oauthService.logOut();
    }
}
