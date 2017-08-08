import {Observable} from 'rxjs/Observable';
import {WishlistSummary} from '../../model/wishlist-summary';
import {Movie} from '../../model/movie';

export abstract class WishlistService {
  abstract getWishlistItemCount(): Observable<number>;

  abstract getWishlistSummary(): Observable<WishlistSummary>;

  abstract addToWishlist(movie: Movie): Observable<boolean>;

  abstract clearWishlist(): Observable<boolean>;

  abstract get wishlistCount(): Observable<number>;

  abstract removeMovie(movie: Movie): Observable<boolean>;

}
