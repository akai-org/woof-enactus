/* tslint:disable */
/* eslint-disable */
/**
 * Woof Enactus API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import globalAxios, { AxiosResponse, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Configuration } from '../configuration';
// Some imports not used depending on template conditions
// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS, RequestArgs, BaseAPI, RequiredError } from '../base';
import { CreatePartnerDto } from '../models';
import { GetAllPartnersResponse } from '../models';
/**
 * PartnersApi - axios parameter creator
 * @export
 */
export const PartnersApiAxiosParamCreator = function (configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreatePartnerDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        partnersControllerCreatePartner: async (body: CreatePartnerDto, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'body' is not null or undefined
            if (body === null || body === undefined) {
                throw new RequiredError('body','Required parameter body was null or undefined when calling partnersControllerCreatePartner.');
            }
            const localVarPath = `/partners`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'POST', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            localVarHeaderParameter['Content-Type'] = 'application/json';

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};
            const needsSerialization = (typeof body !== "string") || localVarRequestOptions.headers['Content-Type'] === 'application/json';
            localVarRequestOptions.data =  needsSerialization ? JSON.stringify(body !== undefined ? body : {}) : (body || "");

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} [city] 
         * @param {string} [type] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        partnersControllerGetAllPartners: async (city?: string, type?: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            const localVarPath = `/partners`;
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (city !== undefined) {
                localVarQueryParameter['city'] = city;
            }

            if (type !== undefined) {
                localVarQueryParameter['type'] = type;
            }

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
        /**
         * 
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        partnersControllerGetPartnerByUuid: async (uuid: string, options: AxiosRequestConfig = {}): Promise<RequestArgs> => {
            // verify required parameter 'uuid' is not null or undefined
            if (uuid === null || uuid === undefined) {
                throw new RequiredError('uuid','Required parameter uuid was null or undefined when calling partnersControllerGetPartnerByUuid.');
            }
            const localVarPath = `/partners/{uuid}`
                .replace(`{${"uuid"}}`, encodeURIComponent(String(uuid)));
            // use dummy base URL string because the URL constructor only accepts absolute URLs.
            const localVarUrlObj = new URL(localVarPath, 'https://example.com');
            let baseOptions;
            if (configuration) {
                baseOptions = configuration.baseOptions;
            }
            const localVarRequestOptions :AxiosRequestConfig = { method: 'GET', ...baseOptions, ...options};
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            const query = new URLSearchParams(localVarUrlObj.search);
            for (const key in localVarQueryParameter) {
                query.set(key, localVarQueryParameter[key]);
            }
            for (const key in options.params) {
                query.set(key, options.params[key]);
            }
            localVarUrlObj.search = (new URLSearchParams(query)).toString();
            let headersFromBaseOptions = baseOptions && baseOptions.headers ? baseOptions.headers : {};
            localVarRequestOptions.headers = {...localVarHeaderParameter, ...headersFromBaseOptions, ...options.headers};

            return {
                url: localVarUrlObj.pathname + localVarUrlObj.search + localVarUrlObj.hash,
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * PartnersApi - functional programming interface
 * @export
 */
export const PartnersApiFp = function(configuration?: Configuration) {
    return {
        /**
         * 
         * @param {CreatePartnerDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async partnersControllerCreatePartner(body: CreatePartnerDto, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PartnersApiAxiosParamCreator(configuration).partnersControllerCreatePartner(body, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} [city] 
         * @param {string} [type] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async partnersControllerGetAllPartners(city?: string, type?: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<GetAllPartnersResponse>>> {
            const localVarAxiosArgs = await PartnersApiAxiosParamCreator(configuration).partnersControllerGetAllPartners(city, type, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
        /**
         * 
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async partnersControllerGetPartnerByUuid(uuid: string, options?: AxiosRequestConfig): Promise<(axios?: AxiosInstance, basePath?: string) => Promise<AxiosResponse<void>>> {
            const localVarAxiosArgs = await PartnersApiAxiosParamCreator(configuration).partnersControllerGetPartnerByUuid(uuid, options);
            return (axios: AxiosInstance = globalAxios, basePath: string = BASE_PATH) => {
                const axiosRequestArgs :AxiosRequestConfig = {...localVarAxiosArgs.options, url: basePath + localVarAxiosArgs.url};
                return axios.request(axiosRequestArgs);
            };
        },
    }
};

/**
 * PartnersApi - factory interface
 * @export
 */
export const PartnersApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    return {
        /**
         * 
         * @param {CreatePartnerDto} body 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async partnersControllerCreatePartner(body: CreatePartnerDto, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PartnersApiFp(configuration).partnersControllerCreatePartner(body, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} [city] 
         * @param {string} [type] 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async partnersControllerGetAllPartners(city?: string, type?: string, options?: AxiosRequestConfig): Promise<AxiosResponse<GetAllPartnersResponse>> {
            return PartnersApiFp(configuration).partnersControllerGetAllPartners(city, type, options).then((request) => request(axios, basePath));
        },
        /**
         * 
         * @param {string} uuid 
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        async partnersControllerGetPartnerByUuid(uuid: string, options?: AxiosRequestConfig): Promise<AxiosResponse<void>> {
            return PartnersApiFp(configuration).partnersControllerGetPartnerByUuid(uuid, options).then((request) => request(axios, basePath));
        },
    };
};

/**
 * PartnersApi - object-oriented interface
 * @export
 * @class PartnersApi
 * @extends {BaseAPI}
 */
export class PartnersApi extends BaseAPI {
    /**
     * 
     * @param {CreatePartnerDto} body 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PartnersApi
     */
    public async partnersControllerCreatePartner(body: CreatePartnerDto, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PartnersApiFp(this.configuration).partnersControllerCreatePartner(body, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} [city] 
     * @param {string} [type] 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PartnersApi
     */
    public async partnersControllerGetAllPartners(city?: string, type?: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<GetAllPartnersResponse>> {
        return PartnersApiFp(this.configuration).partnersControllerGetAllPartners(city, type, options).then((request) => request(this.axios, this.basePath));
    }
    /**
     * 
     * @param {string} uuid 
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof PartnersApi
     */
    public async partnersControllerGetPartnerByUuid(uuid: string, options?: AxiosRequestConfig) : Promise<AxiosResponse<void>> {
        return PartnersApiFp(this.configuration).partnersControllerGetPartnerByUuid(uuid, options).then((request) => request(this.axios, this.basePath));
    }
}
