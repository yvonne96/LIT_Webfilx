import {Component, Input} from '@angular/core';
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

  constructor(private movieService: MovieService) {
    this.refreshMyMovies();
  }

  private refreshMyMovies(): void {
    this.movieService.fetchMyMovies()
      .subscribe(movies => this.movies = movies);
  }
}
