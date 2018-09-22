// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

// 3rd party modules

// App components
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/layout.module';
import { AppHttpClientModule } from './http-client/http-client.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { AuthModule } from './auth/auth.module';

// App services

const coreModules = [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
];

const appModules = [
    AppRoutingModule,
    AppLayoutModule,
    AuthModule.forRoot(),
    AppHttpClientModule.forRoot()
];

const appComponents = [
    AppComponent,
    ProductsComponent
];

const appProviders = [
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
        ...appProviders,
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class AppModule { }
