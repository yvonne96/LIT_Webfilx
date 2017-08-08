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

  addMovie(price: number,
           title: string,
           year: string,
           genre: number,
           classification: number,
           director: string,
           cast: string,
           description: string): Observable<boolean> {

    return this.restService.post(baseUrl + '/' + price + '/' + title + '/' + year + '/' + genre + '/' + classification
      + '/' + director  + '/' + cast + '/' + description)
      .build()
      .map(() => true)
      .catch(error => {
        console.log('unable to add movie');
        return Observable.of(false);
      });
  }

  /* addPrice(price: number): Observable<boolean> {
    return this.restService.post(baseUrl  + '/' + price )
      .build()
      .map(() => true)
      .catch(error => {
        console.log('unable to add movie');
        return Observable.of(false);
      });
  }*/

  fetchById(id: number): Observable<Movie> {

    return this.restService.get(baseUrl + '/byId/' + id)
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('unable to retrieve movie by id');
        return Observable.of();
      });
  }

  editMovie(price: number, id: number, title: string, year: string, genre: number,
            classification: number, director: string, cast: string, description: string): Observable<boolean> {

    return this.restService.post(baseUrl + '/' +  price + '/' + id + '/' + title + '/' + year + '/' +
      genre + '/' + classification + '/' + director + '/' + cast + '/' + description )
      .build()
      .map(() => true);
  }
}

