import {Component,Input} from '@angular/core';
import {Movie} from '../../../../model/movie';
import {ActivatedRoute, Router} from '@angular/router';
// import {theMovie} from '../manage-movies-row.component';

// import {Observable} from 'rxjs/Observable';
// import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  moduleId: module.id,
  selector: 'edit-movie',
  templateUrl: 'edit-movie.component.html'
})
export class EditMovieComponent {
  private title: string;
  private year: string;
  private genre: number;
  private classification: number;
  private director: string;
  private price: number;
  private cast: string;
  private description: string;
  private movieToEdit: Movie;
  private movieChanges: Movie;
  private sub: Subscription;

  constructor(private router: Router,
              private movieService: MovieService, private route: ActivatedRoute) {
    // this.aMovie = theMovie.getCurrentMovie();
    // this.title = this.aMovie.title;
  }

  editMovie() {
    this.movieService.editMovie(this.movieToEdit.id, this.title, this.year,
      this.genre, this.classification, this.director, this.cast, this.description)
      .subscribe(
        next => {
          this.router.navigate(['../']);
        },
      );
  }
  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => console.log(v));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
