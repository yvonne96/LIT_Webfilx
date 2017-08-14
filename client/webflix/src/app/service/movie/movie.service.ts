import {Observable} from 'rxjs';
import {Movie} from '../../model/movie';

export abstract class MovieService {
  abstract fetchAllMovies(): Observable<Movie[]>;

  abstract fetchByTitle(title: string): Observable<Movie[]>;

  abstract fetchMyMovies(): Observable<Movie[]>;
  abstract fetchById(id: number): Observable<Movie>;
  abstract addPrice(price: number): Observable<boolean>;
  abstract addMovie(movie: Movie, genre: string, classification: string): Observable<boolean>;
  abstract addImage(image: string): Observable<boolean>;


}
