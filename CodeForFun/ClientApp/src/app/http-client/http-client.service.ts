// https://github.com/netmedia/angular-architecture-patterns

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { IApiSettings, ResponeTypes, LoadingState, createLoadingState, LoadingStateMetadataKey } from './http-client.utils';
import { environment } from '../../environments/environment';
import 'reflect-metadata';

@Injectable()
export abstract class HttpAbstractService {
    public loadingState$ = new Subject<LoadingState>();

    constructor(
        protected router: Router,
        protected httpClient: HttpClient,
    ) {
    }

    protected pendingRequest = 0;

    protected getBaseUrl(): string {
        return environment.apiUrl;
    }

    protected getDefaultHeaders(): Object {
        return new HttpHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    protected getApiSettings(apiSettings?: IApiSettings): IApiSettings {
        const defaultSettings: IApiSettings = {
            showResponeMessage: true,
            showProgress: true,
            responeType: ResponeTypes.json
        };
        return apiSettings ? { ...defaultSettings, ...apiSettings } : defaultSettings;
    }

    /**
	 * @param observableRes
	 * @param settings
	 * @param propertyKey name of api function
	 */
    protected responseInterceptor(
        observableRes: Observable<any>,
        settings: IApiSettings,
        propertyKey: string
    ): Observable<any> {
        return observableRes.pipe(
            map(res => this._baseAdapter(res, settings)),
            finalize(() => { this._onFinalize(settings, propertyKey); }),
            catchError((error, _) => of(this._onCatch(error, settings, propertyKey)))
        );
    }

    private _baseAdapter(res: HttpResponse<any>, settings: IApiSettings): any {
        if (res.status === 200) {
            const body = res.body;

            if (settings.responeType === ResponeTypes.json) {
                return body;
            }
        }
    }

    private _onFinalize(settings: IApiSettings, propertyKey: string) {
        // set time-out in case another request is call right after
        setTimeout(() => {
            if (this.pendingRequest > 0) {
                this.pendingRequest--;
            }

            if (settings.showProgress && this.pendingRequest === 0) {

            }

            Reflect.defineMetadata(LoadingStateMetadataKey, false, this, propertyKey);
            this.loadingState$.next(createLoadingState({ target: this, propertyKey: propertyKey }));
        }, 0);
    }

    /** Handle error status code 400 -> 500 */
    private _onCatch(response: HttpErrorResponse, setting: IApiSettings, propertyKey: string) {
        switch (response.status) {
            case 401: {
                this.router.navigate(['/']);
                break;
            }
            case 403: {
                this.router.navigate(['access-denied']);
                break;
            }
            case 404: {
                break;
            }

            default:
                this.router.navigate(['/']);
                break;
        }

        throw response;
    }
}
