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
  private genres: Genre[];
  private classifications: Classification[];
  private filesToUpload: File[];
  private fileName: string;
  private errorMessage: string;

  constructor(private movieService: MovieService, private router: Router,
              private authenticationService: AuthenticationService,
              ) {

    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
    this.getGenreValues(this.movieService.getGenreValues());
    this.getClassificationValues(this.movieService.getClassificationValues());
  }

  addMovie() {
    // console.log('printing imagae from add movie function:  ');
    if (this.validate()) {
      this.movieService.addMovie(this.price, this.title, this.year, this.genre,
        this.classification, this.director, this.mainCast, this.description)
        .subscribe(
          next => {
            this.router.navigate(['/dashboard/admin/manage-movies']);
          },
          error => {
            console.log('Error adding movie');
            this.errorMessage = 'Adding ' + this.title + ' was unsuccessful';
          }
        );
    }
    this.errorMessage = 'Adding ' + this.title + ' was unsuccessful';
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


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  uploadImagetoStorageContainer() {
    this.makeFileRequest('/UploadImage/UploadImagetoBlob', [], this.filesToUpload).then((result) => {
      console.log(result);
    }, (error) => {
      console.error(error);
    });
  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      let formData: any = new FormData();
      formData.append('uploads[]', files[0], files[0].name);
      this.fileName = files[0].name;
      console.log(this.fileName);
    });
  }

  validate() {
    return !(this.castValidation() || this.directorValidation() || this.descriptionValidation() || this.yearValidation());
  }

  yearValidation() {
    let matcher = new RegExp(/^(18\d\d|19\d\d|2\d{3})$/); // Year must be in the range of1800-2999
    return !(matcher.test(this.year));
  }

  directorValidation() {
    return (this.director.trim() === '');
  }

  castValidation() {
    return (this.mainCast.trim() === '');
  }

  descriptionValidation() {
    return (this.description.trim() === '');
  }
}

