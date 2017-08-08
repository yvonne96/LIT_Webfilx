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
    this.movieService.addMovie(this.fileName, this.price, this.title, this.year, this.genre,
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
  //     pnp.sp.web.getFolderByServerRelativeUrl('/app/assets/images/').files.add('trial.jpg', file, true);
  //
  //     // let xhr = new XMLHttpRequest();
  //
  //     // xhr.onreadystatechange = function () {
  //     //   if (xhr.readyState === 4) {
  //     //     if (xhr.status === 200) {
  //     //       alert(' uploaded image into storgae blob');
  //     //       resolve(JSON.parse(xhr.response));
  //     //
  //     //     } else {
  //     //       reject(xhr.response);
  //     //     }
  //     //   }
  //     // }
  //     // xhr.open('POST', url, true);
  //     // xhr.send(formData);
    });
  }

}

