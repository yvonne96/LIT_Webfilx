import {Component, } from '@angular/core';
import {MovieService} from '../../service/movie/movie.service';
import {Movie} from '../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'my-movies',
  templateUrl: 'my-movies.component.html',
  styleUrls: ['my-movies.component.css']
})
export class MyMoviesComponent {
  private movies: Movie[];
  private myFavoriteMovies: Movie[];
  private checked: boolean = true;
  private returnValue: boolean;
  private favorite: boolean = false;
  private check: number;

  constructor(private movieService: MovieService) {
    this.refreshMyMovies();
    this.refreshMyFavorites();
  }

  private refreshMyMovies(): void {
    this.movieService.fetchMyMovies()
      .subscribe(movies => this.movies = movies);
  }
  private refreshMyFavorites(): void {
    this.movieService.getMyFavorites()
      .subscribe(movies => {
        this.myFavoriteMovies = movies;
      });
  }

  toggleFavorite(movie: Movie) {
    this.refreshMyFavorites();
    if (!this.checkIfFavorite(movie.id)) {
      this.favorite = true;
      this.refreshMyFavorites();
      console.log(this.favorite);
      this.movieService.toggleFavorite(movie.id, this.favorite)
        .subscribe(() => {
          this.refreshMyMovies();
          this.refreshMyFavorites();
        });
    }

  }

  checkIfFavorite(thisMovieId: number): boolean {
    this.check = thisMovieId;
    this.refreshMyFavorites();
    let checkMovies: Movie[] = this.myFavoriteMovies;
    console.log(this.check);
    for (let m = 0; m < checkMovies.length; m++) {
      if (this.check === checkMovies[m].id) {
        this.returnValue = true;
      }
    }
    if (this.returnValue) {
      return true;
    } else {
      return false;
    }
  }

  setView() {
    if (document.cookie.length === 0) {
      document.cookie = 'defaultView=grid; expires=Thu, 01 Jan 2020 00:00:00 UTC;';
      this.checked = true;
      return true;
    } else {
      let cookie = document.cookie.split(';')[0].slice(12);
      if (cookie === 'grid') {
        this.checked = true;
        return true;
      } else {
        this.checked = false;
        return false;
      }
    }
  }
  updateView() {
    if (this.setView()) {
      this.checked = false;
      document.cookie = 'defaultView=table; expires=Thu, 01 Jan 2020 00:00:00 UTC;';
    } else {
      this.checked = true;
      document.cookie = 'defaultView=grid; expires=Thu, 01 Jan 2020 00:00:00 UTC;';
    }
  }

}
