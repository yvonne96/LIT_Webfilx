import {Component} from '@angular/core';
import {MovieService} from '../../service/movie/movie.service';
import {Movie} from '../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'my-movies',
  templateUrl: 'my-movies.component.html'
})
export class MyMoviesComponent {
  private movies: Movie[];

  constructor(private movieService: MovieService) {
    this.refreshMyMovies();
  }

  private refreshMyMovies(): void {
    this.movieService.fetchMyMovies()
      .subscribe(movies => this.movies = movies);
  }
}
