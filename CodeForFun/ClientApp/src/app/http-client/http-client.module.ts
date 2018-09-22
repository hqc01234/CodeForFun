import { NgModule, Optional, SkipSelf, ModuleWithProviders } from '@angular/core';
import { ProductApiService } from './apis/product.api';

const httpClientModuleProviders = [
    ProductApiService
];

@NgModule()
export class AppHttpClientModule {
    constructor(@Optional() @SkipSelf() httpClientModule: AppHttpClientModule) {
        if (httpClientModule) {
            throw new Error('HttpClientModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AppHttpClientModule,
            providers: [
                ...httpClientModuleProviders
            ]
        };
    }
}
