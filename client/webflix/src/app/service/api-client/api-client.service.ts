/**
 * Created by mattmccomb on 15/11/2016.
 */
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {Injectable} from '@angular/core';
import {User} from '../../model/user';
import {RestService} from './rest.service';
import {Account} from '../../model/account';

@Injectable()
export class ApiClient {
  constructor(private restService: RestService) {
  }

  login(email: string, password: string): Observable<any> {
    return this.restService.post('/account/login', false)
      .addHeader('username', email)
      .addHeader('password', password)
      .build()
      .map(response => {
        if (response.ok) {
          return response.json();
        }

        return '';
      }).catch(response => {
        console.log('Error registering user: ' + response.toString());
        return Observable.throw(new ApiClientError(ApiClientErrorCode.INVALID_LOGIN_CREDENTIALS));
      });
  }

  register(user: User): Observable<boolean> {
    let body = JSON.stringify(user);
    return this.restService.post('/account/register', false)
      .setBody(body)
      .build()
      .map(() => true)
      .catch(response => {
        console.log('Error registering user: ' + response.toString());
        if (response.status === 409) {
          return Observable.throw(new ApiClientError(ApiClientErrorCode.EMAIL_ADDRESS_IN_USE));
        } else {
          return Observable.throw(new ApiClientError(ApiClientErrorCode.GENERIC_REGISTRATION_FAILURE));
        }
      });
  }

  listUsers(): Observable<any> {
    return this.restService.get('/accounts/all')
      .build()
      .map((response: Response) => {
        return response.json();
      })
      .catch((response: Response) => {
        if (response.status === 401) {
          return Observable.throw(new ApiClientError(ApiClientErrorCode.UNAUTHORIZED_REQUEST));
        }
      });
  }

  getCurrentAccountID(): Observable<number> {
    return this.restService.get('/account/currentUserID')
      .build()
      .map(resp => resp.json());
  }

  getAccountByID(accountID: number): Observable<Account> {
    return this.restService.get('/account/UserByID/' + accountID)
      .build()
      .map(resp => resp.json());
  }
}

export class ApiClientError extends Error {
  public name: string;

  constructor(public errorCode: ApiClientErrorCode) {
    super('');
    this.name = 'ApiClientError';
    this.stack = (<any> new Error()).stack;
  }
}

export enum ApiClientErrorCode {

  // Login Error Codes
  INVALID_LOGIN_CREDENTIALS,

    // Register Error Codes
  GENERIC_REGISTRATION_FAILURE,
  EMAIL_ADDRESS_IN_USE,

    // Unauthorized Request
  UNAUTHORIZED_REQUEST
}
