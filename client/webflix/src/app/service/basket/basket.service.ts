import {Observable} from 'rxjs/Observable';
import {Movie} from '../../model/movie';
import {BasketSummary} from '../../model/basket-summary';

export abstract class BasketService {
  abstract getBasketItemCount(): Observable<number>;

  abstract addToBasket(movie: Movie): Observable<boolean>;

  abstract get basketCount(): Observable<number>;

  abstract getBasketSummary(): Observable<BasketSummary>;

  abstract clearBasket(): Observable<boolean>;

  abstract removeMovie(movie: Movie): Observable<boolean>

  abstract checkout(): Observable<boolean>
}
