import {Component,Input} from '@angular/core';
import {Movie} from '../../../../model/movie';
import {ActivatedRoute, Router} from '@angular/router';
// import {theMovie} from '../manage-movies-row.component';

// import {Observable} from 'rxjs/Observable';
// import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';
import {Subscription} from "rxjs/Subscription";
import {error} from "selenium-webdriver";
import {isNumber} from "util";

@Component({
  moduleId: module.id,
  selector: 'edit-movie',
  templateUrl: 'edit-movie.component.html'
})
export class EditMovieComponent {
  private id: number;
  private title: string;
  private year: string;
  private genre: number;
  private classification: number;
  private director: string;
  private price: number;
  private cast: string;
  private description: string;
  private movieToEdit: Movie;
  private errorMessage: string;

  constructor(private router: Router,
              private movieService: MovieService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {this.id = +params['id']; });
    this.fetchById();
  }

  editMovie() {
    console.log('in edit form:  ', this.price);
      this.movieService.editMovie(this.id, this.title, this.year,
        this.genre, this.classification, this.director, this.cast, this.description, this.price)
        .subscribe(
          next => {
            this.router.navigate(['/dashboard/admin/manage-movies']);
          },
          error => {
            this.errorMessage = 'Editing ' + this.movieToEdit.title + ' was unsuccessful';
          },
        );
  }

  // validate() {
  //   if (this.year.trim() || isNumber(this.year)) {
  //     return false;
  //   }
  //   return !this.director.trim() || !this.cast.trim() || !this.description.trim();
  // }
  fetchById() {
    this.movieService.fetchById(this.id)
      .subscribe(
        movie => {
          this.movieToEdit = movie;
          this.intializeMovieParameters();
          console.log(this.movieToEdit);
        }
      );
    }

    intializeMovieParameters() {
      this.title = this.movieToEdit.title;
      this.year = this.movieToEdit.year;
      this.genre = this.movieToEdit.genre.id;
      this.classification = this.movieToEdit.classification.id;
      this.director = this.movieToEdit.director;
      this.price = this.movieToEdit.price;
      this.cast = this.movieToEdit.cast;
      this.description = this.movieToEdit.description;
    }
  }

