import {Observable} from 'rxjs';
import {Movie} from '../../model/movie';

export abstract class MovieService {
  abstract fetchAllMovies(): Observable<Movie[]>;

  abstract fetchByTitle(title: string): Observable<Movie[]>;

  abstract fetchMyMovies(): Observable<Movie[]>;

  abstract editMovie(id: number, title: string, year: string, genre: number, classification: number,
                     director: string, cast: string, description: string, price: number): Observable<boolean>;
  abstract fetchById(id: number): Observable<Movie>;
}
