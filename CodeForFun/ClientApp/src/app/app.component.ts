import { Component } from '@angular/core';
import { AppOAuthService } from './auth/services/app.oauth.service';
import { MatIconRegistry } from '@angular/material';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        public appOAuthService: AppOAuthService,
        private _matIconRegistry: MatIconRegistry
    ) {
        this.appOAuthService.initialize();
        this._matIconRegistry.registerFontClassAlias('fontawesome', 'fas');
    }
}
