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
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.fetchById();
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
    this.getGenreValues(this.movieService.getGenreValues());
    this.getClassificationValues(this.movieService.getClassificationValues());
  }

  editMovie() {
    if (this.validate()) {
      this.movieService.editMovie(this.id, this.title.trim(), this.year.trim(),
        this.genre, this.classification, this.director.trim(), this.cast.trim(), this.description.trim(), this.price)
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
    return !(this.castValidation() || this.directorValidation() || this.descriptionValidation() || this.yearValidation());
  }

  yearValidation() {
    let matcher = new RegExp(/^(181[2-9]|18[2-9]\d|19\d\d|2\d{3})$/); // 1812-2999
    let notAYear = false;
    if (!(matcher.test(this.year))) {
      notAYear = true
    }
    return (this.year.trim() === '' || !Number(this.year) || notAYear);
  }

  directorValidation() {
    return (this.director.trim() === '');
  }

  castValidation() {
    return (this.cast.trim() === '');
  }

  descriptionValidation() {
    return (this.description.trim() === '');
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

  getGenreValues(source: Observable<Genre[]>) {
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
