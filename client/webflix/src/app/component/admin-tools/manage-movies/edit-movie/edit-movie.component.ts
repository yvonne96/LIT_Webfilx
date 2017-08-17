import {Component} from '@angular/core';
import {Classification, Genre, Movie} from '../../../../model/movie';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../../../service/movie/movie.service';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {Observable} from 'rxjs/Observable';

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
  private genres: Genre[];
  private classifications: Classification[];

  constructor(private router: Router,
              private movieService: MovieService, private route: ActivatedRoute, private authenticationService: AuthenticationService) {
    // gets id from the url
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.fetchById();   // this is to intialize movieToEdit
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
    this.getGenreValues(this.movieService.getGenreValues());
    this.getClassificationValues(this.movieService.getClassificationValues());
  }

  editMovie() {
    if (this.validate()) {
      this.movieService.editMovie(this.price, this.id, this.title.trim(), this.year.trim(),
        this.genre, this.classification, this.director.trim(), this.cast.trim(), this.description.trim())
        .subscribe(
          next => {
            this.router.navigate(['/dashboard/admin/manage-movies']);
          },
          error => {
            this.errorMessage = 'Editing ' + this.movieToEdit.title + ' was unsuccessful';
          },
        );
    }
    this.errorMessage = 'Editing ' + this.movieToEdit.title + ' was unsuccessful';
  }


  validate() {
    // validating edit form's different fields
    return !(this.castValidation() || this.directorValidation() || this.descriptionValidation() || this.yearValidation());
  }

  yearValidation() {
    // checks if year is in the range of 1800-2999
    let matcher = new RegExp(/^(18\d\d|19\d\d|2\d{3})$/); // 1800-2999
    return !(matcher.test(this.year));
  }

  directorValidation() {
    // makes sure director field contains charachters
    return (this.director.trim() === '');
  }

  castValidation() {
    // makes sure cast field contains charachters
    return (this.cast.trim() === '');
  }

  descriptionValidation() {
    // makes sure description field contains charachters
    return (this.description.trim() === '');
  }

  fetchById() {
    // gets movie by ID
    this.movieService.fetchById(this.id)
      .subscribe(
        movie => {
          this.movieToEdit = movie;
          this.intializeMovieParameters();
        }
      );
  }

  intializeMovieParameters() {
    // sets form fields to corresponding movie details
    this.title = this.movieToEdit.title;
    this.year = this.movieToEdit.year;
    this.genre = this.movieToEdit.genre.id;
    this.classification = this.movieToEdit.classification.id;
    this.director = this.movieToEdit.director;
    this.price = this.movieToEdit.price;
    this.cast = this.movieToEdit.cast;
    this.description = this.movieToEdit.description;
  }

  getGenreValues(source: Observable<Genre[]>) {
    // get all genres to fill genre drop down menu
    source
      .subscribe(genres => {
        this.genres = genres;
        this.sortGenreArray();
      }, error => 'error getting genres');
  }
  sortGenreArray() {
    this.genres.sort((firstGenre, nextGenre) => {
      if (firstGenre.value < nextGenre.value) {return -1; }
      if (firstGenre.value > nextGenre.value) {return 1; }
      return 0;
    });
  }
  getClassificationValues(source: Observable<Classification[]>) {
    // get all classifications to fill classification drop down menu
    source
      .subscribe(classifications => {
        this.classifications = classifications;
        this.sortClassificationArray();
      }, error => 'error getting classification');
  }
  sortClassificationArray() {
    this.classifications.sort((firstClassification, nextClassification) => {
      if (firstClassification.value < nextClassification.value) {return -1; }
      if (firstClassification.value > nextClassification.value) {return 1; }
      return 0;
    });
  }
}
