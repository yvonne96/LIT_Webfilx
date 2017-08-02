import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Movie} from '../../model/movie';
import {MovieService} from './movie.service';
import {RestService} from '../api-client/rest.service';

const baseUrl = '/movie';

@Injectable()
export class HttpMovieService extends MovieService {

  constructor(private http: Http,
              private restService: RestService) {
    super();
  }

  fetchAllMovies(): Observable<Movie[]> {
    return this.restService.get(baseUrl)
      .build()
      .map(resp => resp.json());
  }

  fetchByTitle(title: string): Observable<Movie[]> {
    return this.restService.get(baseUrl + '/byTitle/' + title)
      .build()
      .map(resp => resp.json());
  }

  fetchMyMovies(): Observable<Movie[]> {
    return this.restService.get(baseUrl + '/mine')
      .build()
      .map(resp => resp.json());
  }

  fetchPurchasableMovies(): Observable<Movie[]> {
    return this.restService.get(baseUrl + '/purchasableMovies')
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('Error retrieving purchasable movies');
        return Observable.of([]);
      });
  }

  togglePurchasableMovie(movie: Movie): Observable<boolean> {
    return this.restService.post(baseUrl + '/togglePurchasable/' + movie.id + '/' + (!movie.purchasable))
      .build()
      .map(() => true)
      .catch(error => {
        console.log('Error toggling purchasable field of movie');
        return Observable.of(false);
      });
  }
}
