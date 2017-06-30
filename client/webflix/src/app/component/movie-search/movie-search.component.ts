import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/observable';

import {MovieService} from '../../service/movie/movie.service';
import {Movie} from '../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'movie-search',
  templateUrl: 'movie-search.component.html',
  styleUrls: ['movie-search.component.css']
})
export class MovieSearchComponent {
  title: string;
  movies: Movie[];
  isSearching: boolean;

  constructor(private movieService: MovieService,
              private router: Router) {
    this.title = '';
    this.isSearching = false;
    this.fetchAllMovies();
  }

  doSearch() {
    this.isSearching = true;
    this.extractMovies(this.movieService.fetchByTitle(this.title));
  }

  private fetchAllMovies(): void {
    this.extractMovies(this.movieService.fetchAllMovies());
  }

  private extractMovies(source: Observable<Movie[]>) {
    return source
      .subscribe(movies => {
        this.movies = movies;
        this.isSearching = false;
      }, error => this.router.navigate(['/login']));
  }
}
