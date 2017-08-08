import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {WishlistService} from './wishlist.service';
import {RestService} from '../api-client/rest.service';

const baseUrl = '/wishlist';

@Injectable()
export class HttpWishlistService extends WishlistService {

  constructor(private restService: RestService) {
    super();
  }

  getWishlistItemCount(): Observable<number> {
    return this.restService.get(baseUrl + '/count')
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log(`Error reading wishlist count: {error}`);
        return Observable.of(0);
      });
  }
}
