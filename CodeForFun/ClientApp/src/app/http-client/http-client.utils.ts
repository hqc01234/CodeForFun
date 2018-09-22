// https://github.com/netmedia/angular-architecture-patterns

import { HttpParams } from '@angular/common/http';
import { HttpAbstractService } from './http-client.service';
import 'reflect-metadata';

export const PathMetadataKey = Symbol('Path');
export const QueryMetadataKey = Symbol('Query');
export const BodyMetadataKey = Symbol('Body');
export const LoadingStateMetadataKey = Symbol('Loading');

export enum ResponeTypes {
    json = 'json',
    blob = 'blob'
}

export interface LoadingState {
    target: Object;
    propertyKey: string;
    isLoading: boolean;
    /** Indicate whenever another request is pending */
    isHavePendingRequest: boolean;
    of: (funcs: Array<Function>) => boolean;
    isTargetFunc: (func: Function) => boolean;
}

export interface IApiSettings {
    /** Auto display respone message if any, default = true */
    showResponeMessage?: boolean;
    /** Show progress when sending a request, default = true */
    showProgress?: boolean;
    /** Respone type of api, default = json */
    responeType?: ResponeTypes;
}

export interface ParamObject {
    /** key of Query or Path */
    key: string;
    parameterIndex: number;
}

export function methodBuilder(method: 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT') {
    return function (url: string): MethodDecorator {
        return function (target: HttpAbstractService, propertyKey: string, descriptor: any) {
            const pathParams = Reflect.getOwnMetadata(PathMetadataKey, target, propertyKey);
            const queryParams = Reflect.getOwnMetadata(QueryMetadataKey, target, propertyKey);
            const bodyParams = Reflect.getOwnMetadata(BodyMetadataKey, target, propertyKey);

            descriptor.value = function (...args: any[]) {
                const _this = this as HttpAbstractService;
                const _body = createBody(bodyParams, args);
                const _path = createPath(pathParams, url, args);
                const _params = createParams(queryParams, args);
                const _targetUrl = getTargetUrl(_this.getBaseUrl(), _path, _params !== null);
                const _headers = _this.getDefaultHeaders();
                const _setttings = _this.getApiSettings(descriptor.apiSettings);

                Reflect.defineMetadata(LoadingStateMetadataKey, true, target, propertyKey);
                _this.pendingRequest++;
                _this.loadingState$.next(createLoadingState({ target, propertyKey }));

                let observable = _this.httpClient.request(
                    method, _targetUrl,
                    {
                        body: _body,
                        headers: _headers,
                        params: _params,
                        reportProgress: false,
                        observe: 'response', // only observe http response result
                        responseType: _setttings.responeType
                    }
                );

                // intercept the response
                observable = _this.responseInterceptor(observable, _setttings, propertyKey);

                return observable;
            };

            return descriptor;
        };
    };
}

export function paramBuilder(metadataKey: Symbol) {
    return function (key: string): ParameterDecorator {
        return function (target: HttpAbstractService, propertyKey: string, parameterIndex: number) {
            const existingParameters: ParamObject[] = Reflect.getOwnMetadata(metadataKey, target, propertyKey) || [];
            existingParameters.push({ key: key, parameterIndex: parameterIndex });
            Reflect.defineMetadata(metadataKey, existingParameters, target, propertyKey);
        };
    };
}

function createBody(bodyParams: ParamObject[], args: any[]): any {
    return bodyParams ? args[bodyParams[0].parameterIndex] : null;
}

function createPath(pathParams: ParamObject[], url: string, args: any[]): string {
    let resUrl: string = url;

    if (pathParams) {
        for (const k in pathParams) {
            if (pathParams.hasOwnProperty(k)) {
                resUrl = resUrl.replace(`{${pathParams[k].key}}`, args[pathParams[k].parameterIndex]);
            }
        }
    }

    return resUrl;
}

function createParams(queryParams: ParamObject[], args: any[]): HttpParams {
    let params = new HttpParams();

    if (queryParams) {
        queryParams
            .filter(p => args[p.parameterIndex]) // filter out optional parameters
            .forEach(p => {
                const key = p.key;
                const value = args[p.parameterIndex];

                // if value is object, append each key of object to query parameters
                if (value instanceof Object) {
                    for (const valueKey in value) {
                        if (value.hasOwnProperty(valueKey)) {
                            params = params.append(valueKey, value);
                        }
                    }
                } else {
                    params = params.append(key, value);
                }
            });
    }

    return params;
}

function getTargetUrl(baseUrl: string, path: string, isHaveQueryParams: boolean) {
    return `${baseUrl}/${path}${isHaveQueryParams ? '/' : ''}`;
}

function filterTargetFunc(funcs: Function[]) {
    const _this = this as LoadingState;
    let result = false;

    for (let idx = 0, length = funcs.length; idx < length; idx++) {
        const loadingState: boolean = Reflect.getOwnMetadata(LoadingStateMetadataKey, _this.target, _this.propertyKey) || false;
        _this.isHavePendingRequest = loadingState;
        if (funcs[idx] === _this.target[_this.propertyKey]) {
            _this.isLoading = loadingState;
            result = true;
        }
    }
    return result;
}

function isTargetFunc(func: Function): boolean {
    const _this = this as LoadingState;
    return _this.target[_this.propertyKey] === func;
}

export function createLoadingState(param: {
    target: Object,
    propertyKey: string
}): LoadingState {
    return {
        target: param.target,
        propertyKey: param.propertyKey,
        isLoading: false,
        isHavePendingRequest: false,
        of: filterTargetFunc,
        isTargetFunc: isTargetFunc
    };
}
