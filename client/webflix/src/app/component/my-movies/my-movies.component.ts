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
  checked: boolean = true;

  constructor(private movieService: MovieService) {
    this.setMyMovies();
    this.refreshMyMovies();
  }

  private refreshMyMovies(): void {
    this.movieService.fetchMyMovies()
      .subscribe(movies => this.movies = movies);
  }

  private setMyMovies(): void {
    let movies = this.movieService.fetchMyMovies();
  }

  toggleFavorite(movie: Movie) {
    console.log(movie);
    let favorite = true;
    if (movie.favorite = true) {
      favorite = false;
      console.log('value set to false');
    }
    console.log(favorite);
    debugger;
    this.movieService.toggleFavorite(movie.id, favorite)
      .subscribe(() => this.refreshMyMovies());
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
