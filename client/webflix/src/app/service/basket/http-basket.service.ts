import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {Movie} from '../../model/movie';
import {BasketService} from './basket.service';
import {RestService} from '../api-client/rest.service';
import {BasketSummary} from '../../model/basket-summary';

const baseUrl = '/basket';

@Injectable()
export class HttpBasketService extends BasketService {
  basketCountSubject: BehaviorSubject<number>;

  constructor(private restService: RestService) {
    super();
    this.basketCountSubject = new BehaviorSubject<number>(0);
  }

  get basketCount(): Observable<number> {
    return this.basketCountSubject;
  }

  getBasketItemCount(): Observable<number> {
    return this.restService.get(baseUrl + '/count')
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log(`Error reading basket count: {error}`);
        return Observable.of(0);
      });
  }

  addToBasket(movie: Movie): Observable<boolean> {
    return this.restService.post(baseUrl + '/addItem')
      .setBody(movie)
      .build()
      .map(x => true)
      .do(response => this.refreshItemCount())
      .catch(error => {
        console.log(`Error adding item to basket`);
        return Observable.of(false);
      });
  }

  getBasketSummary(): Observable<BasketSummary> {
    return this.restService.get(baseUrl).build()
      .map(resp => resp.json())
      .catch(error => {
        console.log(`Error reading basket`);
        return Observable.of(BasketSummary.empty());
      });
  }

  clearBasket(): Observable<boolean> {
    return this.restService.delete(baseUrl + '/')
      .build()
      .map(() => true)
      .do(() => this.refreshItemCount())
      .catch(error => {
        console.log(`Error reading basket `);
        return Observable.of(false);
      });
  }

  removeMovie(movie: Movie): Observable<boolean> {
    return this.restService.delete(baseUrl + '/movieId/' + movie.id)
      .build()
      .map(() => true)
      .do(() => this.refreshItemCount());
  }

  checkout(): Observable<boolean> {
    return this.restService.post(baseUrl + '/checkout/')
      .build()
      .map(() => true)
      .do(() => this.refreshItemCount())
      .catch(error => {
        console.log(`Error checking out`);
        return Observable.of(false);
      });
  }

  private refreshItemCount() {
    this.getBasketItemCount()
      .subscribe(value => this.basketCountSubject.next(value));
  }
}
