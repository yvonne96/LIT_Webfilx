import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {Classification, Genre, Movie} from '../../model/movie';
import {MovieService} from './movie.service';
import {RestService} from '../api-client/rest.service';

const baseUrl = '/movie';

@Injectable()
export class HttpMovieService extends MovieService {

  constructor(private http: Http,
              private restService: RestService) {
    super();
  }

  fetchById(id: number): Observable<Movie> {
    return this.restService.get(baseUrl + '/byId/' + id)
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('unable to retrieve movie by id');
        return Observable.of();
      });
  }

    fetchAllMovies(): Observable<Movie[]> {
    return this.restService.get(baseUrl)
      .build()
      .map(resp => resp.json());
  }

  getGenreValues(): Observable<Genre[]> {
    return this.restService.get('/genre')
      .build()
      .map(resp => resp.json());
  }

  getClassificationValues(): Observable<Classification[]> {
    return this.restService.get('/classification')
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


  editMovie(price: number, id: number, title: string, year: string, genre: number,
            classification: number, director: string, cast: string, description: string): Observable<boolean> {

    return this.restService.post(baseUrl + '/' +  price + '/' + id + '/' + title + '/' + year + '/' +
      genre + '/' + classification + '/' + director + '/' + cast + '/' + description )
      .build()
      .map(() => true);
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
  toggleFavorite(movie_id: number, favorite: boolean): Observable<boolean> {
    return this.restService.post(baseUrl + '/' + movie_id + '/' + favorite)
      .build()
      .map(() => true)
      .catch(error => {
        console.log('unable to toggle favorites');
        return Observable.of(false);
      });
  }

  getMyFavorites(): Observable<Movie[]> {
    return this.restService.get(baseUrl + '/favorite')
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('error retrieving favorites');
        return Observable.of([]);

      });
  }
}

