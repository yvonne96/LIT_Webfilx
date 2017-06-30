/**
 * Created by mattmccomb on 09/01/2017.
 */

import {Injectable} from '@angular/core';
import {AuthToken} from '../../model/auth-token';

@Injectable()
export class StorageService {

  public readonly CURRENT_USER_STORAGE_KEY: string = 'CurrentUser';

  storeAuthToken(authToken: AuthToken) {
    localStorage.setItem(this.CURRENT_USER_STORAGE_KEY, JSON.stringify(authToken));
  }

  retrieveAuthToken(): AuthToken {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER_STORAGE_KEY));
  }

  clearStoredAuthToken() {
    localStorage.removeItem(this.CURRENT_USER_STORAGE_KEY);
  }
}
