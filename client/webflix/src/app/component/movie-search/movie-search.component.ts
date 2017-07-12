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
  checked: boolean = true;

  constructor(private movieService: MovieService,
              private router: Router) {
    this.title = '';
    this.isSearching = false;
    this.fetchAllMovies();
    this.setView();
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

  checkboxStatus() {
    //
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
