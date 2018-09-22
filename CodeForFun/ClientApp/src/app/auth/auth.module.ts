import { NgModule, ModuleWithProviders, Provider, Optional, SkipSelf } from '@angular/core';
import { OAuthStorage, OAuthService, OAuthModule } from 'angular-oauth2-oidc';
import { LoginRedirectComponent } from './redirect/login-redirect.component';
import { AppOAuthService } from './services/app.oauth.service';
import { AuthGuard } from './guards/auth.guard';
import { environment } from '../../environments/environment';

const authModuleProviders: Provider[] = [
    OAuthService,
    AppOAuthService,
    AuthGuard,
    { provide: OAuthStorage, useValue: localStorage }
];

@NgModule({
    declarations: [
        LoginRedirectComponent
    ],
    imports: [
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: [environment.apiUrl],
                sendAccessToken: true
            }
        })
    ],
    exports: [
        LoginRedirectComponent,
        OAuthModule
    ],
    providers: [
        ...authModuleProviders
    ],
})
export class AuthModule {

    constructor(@Optional() @SkipSelf() authModule: AuthModule) {
        if (authModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AuthModule,
            providers: [
                ...authModuleProviders
            ]
        };
    }
}

