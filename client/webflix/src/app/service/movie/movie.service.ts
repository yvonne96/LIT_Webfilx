import {Observable} from 'rxjs';
import {Movie} from '../../model/movie';

export abstract class MovieService {
  abstract fetchAllMovies(): Observable<Movie[]>;

  abstract fetchByTitle(title: string): Observable<Movie[]>;

  abstract fetchMyMovies(): Observable<Movie[]>;

  abstract fetchPurchasableMovies(): Observable<Movie[]>;

  abstract togglePurchasableMovie(movie: Movie): Observable<boolean>;
}
