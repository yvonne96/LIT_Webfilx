import {Observable} from 'rxjs';
import {Classification, Genre, Movie} from '../../model/movie';

export abstract class MovieService {
  abstract fetchAllMovies(): Observable<Movie[]>;
  abstract getGenreValues(): Observable <Genre[]>;
  abstract getClassificationValues(): Observable <Classification[]>;

  abstract fetchById(id: number): Observable<Movie>;

  abstract fetchByTitle(title: string): Observable<Movie[]>;

  abstract fetchMyMovies(): Observable<Movie[]>;


  abstract addMovie(price: number,
                    title: string,
                    year: string,
                    genre: number,
                    classification: number,
                    director: string,
                    cast: string,
                    description: string ): Observable<boolean>;

  abstract editMovie(price: number, id: number, title: string, year: string, genre: number, classification: number,
                     director: string, cast: string, description: string): Observable<boolean>;


  abstract fetchPurchasableMovies(): Observable<Movie[]>;

  abstract togglePurchasableMovie(movie: Movie): Observable<boolean>;

  abstract toggleFavorite(movie_id: number, favorite: boolean): Observable<boolean>;

  abstract getMyFavorites(): Observable<Movie[]>;

}
