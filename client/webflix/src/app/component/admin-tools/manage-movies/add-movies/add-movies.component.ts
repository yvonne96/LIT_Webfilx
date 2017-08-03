import {Component} from '@angular/core';
import {Router} from '@angular/router';
// import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';
import {Movie} from "../../../../model/movie";
// import {Movie} from '../../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'add-movies',
   styleUrls: ['add-movies.component.css'],
  templateUrl: 'add-movies.component.html'
})

export class AddMoviesComponent {

  private isAdmin: boolean;
  private title: string;
  private year: string;
  private genre: number;
  private classification: number;
  private director: string;
  private price: number;
  private cast: string;
  private description: string;

  constructor(private movieService: MovieService, private router: Router,
              private authenticationService: AuthenticationService,
              ) {

    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);

  }

  addMovie() {
    console.log(this.title, this.year, this.genre,
      this.classification, this.director, this.cast, this.description);
    this.movieService.addMovie(this.title, this.year, this.genre,
      this.classification, this.director, this.cast, this.description)
      .subscribe(
        () => { console.log('Subscribed');
        },
        error => {
          console.log('Error adding movie');
          // this.setCreateFailureMessage();
        }
      );
  }
}

