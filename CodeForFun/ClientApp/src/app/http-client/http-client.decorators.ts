// https://github.com/netmedia/angular-architecture-patterns

import { HttpAbstractService } from './http-client.service';
import {
    methodBuilder, paramBuilder,
    PathMetadataKey, QueryMetadataKey, BodyMetadataKey,
    IApiSettings
} from './http-client.utils';

/* *********************************************
 * Method decorators
 * *********************************************/

/**
 * GET method
 * @param {string} url - resource url of the method
 */
export const GET = methodBuilder('GET');
/**
 * POST method
 * @param {string} url - resource url of the method
 */
export const POST = methodBuilder('POST');
/**
 * PUT method
 * @param {string} url - resource url of the method
 */
export const PUT = methodBuilder('PUT');
/**
 * DELETE method
 * @param {string} url - resource url of the method
 */
export const DELETE = methodBuilder('DELETE');
/**
 * HEAD method
 * @param {string} url - resource url of the method
 */
export const HEAD = methodBuilder('HEAD');

/** Setting API */
export function ApiSettings(settings: IApiSettings): MethodDecorator {
    return function (_: HttpAbstractService, __: string, descriptor: any) {
        descriptor.apiSettings = settings;
        return descriptor;
    };
}

/* *********************************************
 * Parameter decorators
 * *********************************************/

/**
 * Path variable of a method's url
 * @param {string} key - path key to bind value
 */
export const Path = paramBuilder(PathMetadataKey);

/**
 * Query value of a method's url
 * @param {string} key - query key to bind value
 */
export const Query = paramBuilder(QueryMetadataKey);

/**
 * Body of a REST method
 * Only one body per method!
 */
export const Body = paramBuilder(BodyMetadataKey)('Body');
