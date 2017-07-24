import {Inject, Injectable} from '@angular/core';
import {Http, RequestMethod} from '@angular/http';
import {RestService, RequestBuilder} from './rest.service';
import {APP_CONFIG, AppConfig} from '../../app-config';
import {ApiRequestBuilder} from './api-client-request-builder';
import {AuthToken} from '../../model/auth-token';
import {StorageService} from '../storage/storage.service';
import {ApiClientErrorCode} from './api-client.service';
import {ErrorRequestBuilder} from './error-request-builder';

@Injectable()
export class AuthorisedRestService extends RestService {
  private baseUrl: string;

  constructor(private http: Http,
              private storageService: StorageService,
              @Inject(APP_CONFIG) config: AppConfig) {
    super();
    this.baseUrl = config.baseServiceUrl;
  }

  private get token(): AuthToken {
    return this.storageService.retrieveAuthToken();
  }

  get(path: string, authenticate = true): RequestBuilder {
    return this.createBuilder(path, RequestMethod.Get, authenticate);
  }

  post(path: string, authenticate = true) {
    return this.createBuilder(path, RequestMethod.Post, authenticate);
  }

  delete(path: string, authenticate = true) {
    return this.createBuilder(path, RequestMethod.Delete, authenticate);
  }

  put(path: string, authenticate = true) {
    return this.createBuilder(path, RequestMethod.Put, authenticate);
  }

  private createBuilder(path: string, method: RequestMethod, authenticate: boolean): RequestBuilder {
    let builder = new ApiRequestBuilder(this.http, this.baseUrl)
      .setMethod(method)
      .setPath(path);

    if (!authenticate) {
      return builder;
    }

    let tokenString = this.getJwtToken();
    if (tokenString === null) {
      return new ErrorRequestBuilder(ApiClientErrorCode.UNAUTHORIZED_REQUEST);
    }

    return builder.setJwtToken(this.token.jwtToken);
  }

  private getJwtToken() {
    return this.token && this.token.jwtToken;
  }
}
