import {Observable} from 'rxjs/Observable';

export abstract class WishlistService {
  abstract getWishlistItemCount(): Observable<number>;

}
