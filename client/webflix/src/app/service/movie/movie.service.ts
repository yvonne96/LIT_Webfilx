import {Observable} from 'rxjs';
import {Classification, Genre, Movie} from '../../model/movie';

export abstract class MovieService {
  abstract fetchAllMovies(): Observable<Movie[]>;
  abstract getGenreValues(): Observable <Genre[]>;
  abstract getClassificationValues(): Observable <Classification[]>;

  abstract fetchByTitle(title: string): Observable<Movie[]>;

  abstract fetchMyMovies(): Observable<Movie[]>;

  abstract fetchById(id: number): Observable<Movie>;
  abstract addPrice(price: number): Observable<boolean>;
  abstract addMovie(title: string,
                    year: string,
                    genre: number,
                    classification: number,
                    director: string,
                    cast: string,
                    description: string): Observable<boolean>;

  abstract editMovie(id: number, title: string, year: string, genre: number, classification: number,
                     director: string, cast: string, description: string, price: number): Observable<boolean>;

}
