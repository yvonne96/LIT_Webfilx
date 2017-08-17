import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {MovieService} from '../../../service/movie/movie.service';
import {Movie} from '../../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'manage-movies',
  styleUrls: ['manage-movies.component.css'],
  templateUrl: 'manage-movies.component.html'
})
export class ManageMoviesComponent {
  private movies: Movie[];
  private isAdmin: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private movieService: MovieService) {
    this.receiveAllMovies(this.movieService.fetchAllMovies());
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
  }

  receiveAllMovies(source: Observable<Movie[]>) {
    source
      .subscribe(movies => {
        this.movies = movies;
        this.chooseSortMethod('TITLE');
      }, error => alert('Error getting movies'));
  }

  chooseSortMethod(sortMethod: string) {
    switch (sortMethod) {
      case 'YEAR':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.year < nextMovie.year) {
            return -1;
          }
          if (firstMovie.year > nextMovie.year) {
            return 1;
          }
          return 0;
        });
        break;

      case 'GENRE':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.genre.value < nextMovie.genre.value) {
            return -1;
          }
          if (firstMovie.genre.value > nextMovie.genre.value) {
            return 1;
          }
          return 0;
        });
        break;

      case 'RATING':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.rating < nextMovie.rating) {
            return -1;
          }
          if (firstMovie.rating > nextMovie.rating) {
            return 1;
          }
          return 0;
        });
        break;

      case 'DIRECTOR':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.director < nextMovie.director) {
            return -1;
          }
          if (firstMovie.director > nextMovie.director) {
            return 1;
          }
          return 0;
        });
        break;

      case 'CLASSIFICATION':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.classification.value < nextMovie.classification.value) {
            return -1;
          }
          if (firstMovie.classification.value > nextMovie.classification.value) {
            return 1;
          }
          return 0;
        });
        break;

      case 'MAIN CAST':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.cast < nextMovie.cast) {
            return -1;
          }
          if (firstMovie.cast > nextMovie.cast) {
            return 1;
          }
          return 0;
        });
        break;

      case 'PRICE':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.price < nextMovie.price) {
            return -1;
          }
          if (firstMovie.price > nextMovie.price) {
            return 1;
          }
          return 0;
        });
        break;

      case 'DESCRIPTION':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.description < nextMovie.description) {
            return -1;
          }
          if (firstMovie.description > nextMovie.description) {
            return 1;
          }
          return 0;
        });
        break;

      case 'PURCHASABLE':
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.purchasable === true) {
            return -1;
          }
          if (nextMovie.purchasable === true) {
            return 1;
          }
          return 0;
        });
        break;

      default:
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.title < nextMovie.title) {
            return -1;
          }
          if (firstMovie.title > nextMovie.title) {
            return 1;
          }
          return 0;
        });
        break;
    }
  }
}
