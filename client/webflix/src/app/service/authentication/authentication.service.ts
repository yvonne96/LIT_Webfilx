/**
 * Created by mattmccomb on 10/11/2016.
 */
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ApiClient} from '../api-client/api-client.service';
import {AuthToken} from '../../model/auth-token';
import {User} from '../../model/user';
import {StorageService} from '../storage/storage.service';

@Injectable()
export class AuthenticationService {
  private isLoggedInSubject: BehaviorSubject<boolean>;
  private isAdminSubject: BehaviorSubject<boolean>;

  constructor(private apiClient: ApiClient,
              private storageService: StorageService) {
    this.initialiseObservables();
  }

  get token(): AuthToken {
    return this.storageService.retrieveAuthToken();
  }

  set token(authToken: AuthToken) {
    this.storageService.storeAuthToken(authToken);
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject;
  }

  get isAdmin(): Observable<boolean> {
    return this.isAdminSubject;
  }

  login(email: string, password: string): Observable<boolean> {
    return this.apiClient.login(email, password).map((token: any) => {
        this.token = new AuthToken(email, token.token, token.roles);
        this.isLoggedInSubject.next(true);
        this.isAdminSubject.next(this.getIsAdmin());
        return true;
      }
    );
  }

  register(user: User): Observable<boolean> {
    return this.apiClient.register(user);
  }

  logout() {
    this.storageService.clearStoredAuthToken();
    this.isLoggedInSubject.next(false);
  }

  private initialiseObservables() {
    this.isLoggedInSubject = new BehaviorSubject<boolean>(this.getIsLoggedIn());
    this.isAdminSubject = new BehaviorSubject<boolean>(this.getIsAdmin());
  }

  private getIsAdmin() {
    return this.getIsLoggedIn() && this.token.roles.indexOf('ADMIN') >= 0;
  }

  private getIsLoggedIn() {
    return this.token != null;
  }
}
