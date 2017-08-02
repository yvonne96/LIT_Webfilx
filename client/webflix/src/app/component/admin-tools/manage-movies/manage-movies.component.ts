import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {MovieService} from '../../../service/movie/movie.service';
import {Movie} from '../../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'manage-movies',
  // styleUrls: ['manage-movies.component.css'],
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
      }, error => alert('Error getting movies'));
  }
}
