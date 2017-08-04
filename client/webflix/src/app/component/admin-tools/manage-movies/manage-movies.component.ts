import {Component,Input} from '@angular/core';
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
  private sortTitleOn: boolean = false;
  private sortYearOn: boolean = false;
  private sortGenreOn: boolean = false;
  private sortRatingOn: boolean = false;
  private sortDirectorOn: boolean = false;
  private sortClassificationOn: boolean = false;
  private sortCastOn: boolean = false;
  private sortDescriptionOn: boolean = false;
  private sortPriceOn: boolean = false;
  private sortPurchasableOn: boolean = false;

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
        console.log(movies);
      }, error => alert('Error getting movies'));
  }

  setSortVariableToFalse() {
    this.sortTitleOn = false;
    this.sortGenreOn = false;
    this.sortYearOn = false;
    this.sortRatingOn = false;
    this.sortDirectorOn = false;
  }
  chooseSortMethod(sortMethod: string) {
    switch (sortMethod) {
      case 'TITLE':
        this.setSortVariableToFalse();
        this.sortTitleOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.title < nextMovie.title) {return -1; }
          if (firstMovie.title > nextMovie.title) {return 1; }
          return 0;
        });
        break;

      case 'GENRE':
        this.setSortVariableToFalse();
        this.sortGenreOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.genre < nextMovie.genre) {return -1; }
          if (firstMovie.genre > nextMovie.genre) {return 1; }
          return 0;
        });
        break;

      case 'RATING':
        this.setSortVariableToFalse();
        this.sortTitleOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.rating < nextMovie.rating) {return -1; }
          if (firstMovie.rating > nextMovie.rating) {return 1; }
          return 0;
        });
        break;

      case 'DIRECTOR':
        this.setSortVariableToFalse();
        this.sortDirectorOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.director < nextMovie.director) {return -1; }
          if (firstMovie.director > nextMovie.director) {return 1; }
          return 0;
        });
        break;

      case 'CLASSIFICATION':
        this.setSortVariableToFalse();
        this.sortClassificationOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.classification < nextMovie.classification) {return -1; }
          if (firstMovie.classification > nextMovie.classification) {return 1; }
          return 0;
        });
        break;

      case 'MAIN CAST':
        this.setSortVariableToFalse();
        this.sortCastOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.cast < nextMovie.cast) {return -1; }
          if (firstMovie.cast > nextMovie.cast) {return 1; }
          return 0;
        });
        break;

      case 'PRICE':
        this.setSortVariableToFalse();
        this.sortPriceOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.price < nextMovie.price) {return -1; }
          if (firstMovie.price > nextMovie.price) {return 1; }
          return 0;
        });
        break;

      case 'DESCRIPTION':
        this.setSortVariableToFalse();
        this.sortDescriptionOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.description < nextMovie.description) {return -1; }
          if (firstMovie.description > nextMovie.description) {return 1; }
          return 0;
        });
        break;

      case 'PURCHASABLE':
        this.setSortVariableToFalse();
        this.sortPurchasableOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.purchasable === true) {return -1; }
          if (nextMovie.purchasable === true) {return 1; }
          return 0;
        });
        break;

      default:
        this.setSortVariableToFalse();
        this.sortYearOn = true;
        this.movies.sort((firstMovie, nextMovie) => {
          if (firstMovie.year < nextMovie.year) {return -1; }
          if (firstMovie.year > nextMovie.year) {return 1; }
          return 0;
        });
        break;
    }
  }
}
