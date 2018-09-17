// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// 3rd party modules
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';

// App components
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/layout.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LoginRedirectComponent } from './auth/callback-redirect/login-callback.component';

// App services
import { AuthGuard } from './auth/guards/auth.guard';
import { AppOAuthService } from './auth/services/app.oauth.service';

const coreModules = [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
];

const appModules = [
    AppRoutingModule,
    AppLayoutModule
];

const appComponents = [
    AppComponent,
    LoginRedirectComponent,
    ProductsComponent
];

const appServices = [
    AuthGuard,
    AppOAuthService
];

@NgModule({
    declarations: [
        ...appComponents
    ],
    imports: [
        ...coreModules,
        ...appModules,
    ],
    providers: [
        ...appServices,
        { provide: OAuthStorage, useValue: localStorage }
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
