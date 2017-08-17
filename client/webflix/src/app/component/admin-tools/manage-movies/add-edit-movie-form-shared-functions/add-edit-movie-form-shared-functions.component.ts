import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';
import {Movie, Genre, Classification} from '../../../../model/movie';

export class AddEditMovieFormSharedFunction {
  private genres: Genre[];
  constructor() {}

  getGenreValues(source: Observable<Genre[]>): Genre[] {
    source
      .subscribe(genres => {
        this.genres = genres;
        // this.sortGenreArray();
      }, error => 'error getting genres');
    return this.genres;
  }
}
