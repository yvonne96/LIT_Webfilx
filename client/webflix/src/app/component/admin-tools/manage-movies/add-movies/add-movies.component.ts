import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';
import {Movie, Genre, Classification} from '../../../../model/movie';

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
  private mainCast: string;
  private description: string;
  private image: string;
  private genres: Genre[];
  private classifications: Classification[];

  constructor(private movieService: MovieService, private router: Router,
              private authenticationService: AuthenticationService,
              ) {

    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
    this.getGenreValues(this.movieService.getGenreValues());
    this.getClassificationValues(this.movieService.getClassificationValues());
  }

  saveImageToFile() {
    console.log('Here');
    console.log(this.image);
  }
  addMovie() {

    this.movieService.addMovie(this.price, this.title, this.year, this.genre,
      this.classification, this.director, this.mainCast, this.description)
      .subscribe(
        next => {
          this.router.navigate(['/dashboard/admin/manage-movies']);
        },
        error => {
          console.log('Error adding movie');
        }
      );
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

