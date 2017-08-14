import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {WishlistService} from './wishlist.service';
import {RestService} from '../api-client/rest.service';
import {WishlistSummary} from '../../model/wishlist-summary';
import {Movie} from '../../model/movie';

const baseUrl = '/wishlist';

@Injectable()
export class HttpWishlistService extends WishlistService {
  wishlistCountSubject: BehaviorSubject<number>;

  constructor(private restService: RestService) {
    super();
    this.wishlistCountSubject = new BehaviorSubject<number>(0);
  }

  get wishlistCount(): Observable<number> {
    return this.wishlistCountSubject;
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

  getWishlistSummary(): Observable<WishlistSummary> {
    return this.restService.get(baseUrl).build()
      .map(resp => resp.json())
      .catch(error => {
        console.log(`Error reading wishlist`);
        return Observable.of(WishlistSummary.empty());
      });
  }

  addToWishlist(movie: Movie): Observable<boolean> {
    return this.restService.post(baseUrl + '/addItem')
      .setBody(movie)
      .build()
      .map(x => true)
      .do(response => this.refreshItemCount())
      .catch(error => {
        console.log(`Error adding item to wishlist`);
        return Observable.of(false);
      });
  }

  private refreshItemCount() {
    this.getWishlistItemCount()
      .subscribe(value => this.wishlistCountSubject.next(value));
  }

  clearWishlist(): Observable<boolean> {
    return this.restService.delete(baseUrl + '/')
      .build()
      .map(() => true)
      .do(() => this.refreshItemCount())
      .catch(error => {
        console.log(`Error reading wishlist`);
        return Observable.of(false);
      });
  }

  removeMovie(movie: Movie): Observable<boolean> {
    return this.restService.delete(baseUrl + '/movieId/' + movie.id)
      .build()
      .map(() => true)
      .do(() => this.refreshItemCount());
  }
}
