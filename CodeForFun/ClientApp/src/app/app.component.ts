import { Component } from '@angular/core';
import { AppOAuthService } from './auth/services/app.oauth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        public appOAuthService: AppOAuthService
    ) {
        this.appOAuthService.initialize();
    }
}
