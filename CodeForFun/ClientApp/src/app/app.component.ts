import { Component } from '@angular/core';
import { AppOAuthService } from './auth/services/app.oauth.service';
import { ProductApiService } from './http-client/apis/product.api';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(
        public appOAuthService: AppOAuthService,
        private _productApi: ProductApiService
    ) {
        this.appOAuthService.initialize();

        // testing api service...
        this.appOAuthService.isLoggedIn$.subscribe((isLoggedIn) => {
            if (isLoggedIn) {
                this._productApi.loadingState$.pipe(
                    filter(loadingState => {
                        return loadingState.of([
                            this._productApi.getSampleData
                        ]);
                    })
                ).subscribe(loadingState => {
                    if (loadingState.isTargetFunc(this._productApi.getSampleData)) {
                        console.log(`${new Date()}: API getSampleData loading state: ${loadingState.isLoading}`);
                    }
                });

                this._productApi.getSampleData(1).subscribe((data) => {

                });
            }
        });
    }
}
