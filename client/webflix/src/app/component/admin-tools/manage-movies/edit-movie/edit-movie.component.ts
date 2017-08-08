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
import {AuthenticationService} from "../../../../service/authentication/authentication.service";

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
  private isAdmin: boolean;

  constructor(private router: Router,
              private movieService: MovieService, private route: ActivatedRoute , private authenticationService: AuthenticationService) {
    this.route.params.subscribe(params => {this.id = +params['id']; });
    this.fetchById();
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
  }

  editMovie() {
    if (this.validate()) {
      this.movieService.editMovie(this.price, this.id, this.title, this.year,
        this.genre, this.classification, this.director, this.cast, this.description)
        .subscribe(
          next => {
            this.router.navigate(['/dashboard/admin/manage-movies']);
          },
          error => {
            this.errorMessage = 'Editing ' + this.movieToEdit.title + ' was unsuccessful in database';
          },
        );
    }
    this.errorMessage = 'Editing ' + this.movieToEdit.title + ' was unsuccessful';
  }

  // trimWhiteSpace (str: string) {
  //   return str.replace(/^\s+|\s+$/gm, '');
  // }

  validate() {
    if (this.year.trim() === '') {
      return false;
    }
    if (this.director.trim() === '') {
      return false;
    }
    if (this.cast.trim() === '') {
      return false;
    }
    if (this.description.trim() === '') {
      return false;
    }
    if (!Number(this.year)) {
      return false;
    }
    return true;
  }

  fetchById() {
    this.movieService.fetchById(this.id)
      .subscribe(
        movie => {
          this.movieToEdit = movie;
          this.intializeMovieParameters();
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

