import {Component,Input} from '@angular/core';
import {Movie} from '../../../../model/movie';
import {Router} from '@angular/router';
// import {Observable} from 'rxjs/Observable';
// import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';

@Component({
  moduleId: module.id,
  selector: 'edit-movie',
  templateUrl: 'edit-movie.component.html'
})
export class EditMovieComponent {
  private title: string;
  private year: number;
  private genre: string;
  private classification: number;
  private director: string;
  private price: number;
  private cast: string;
  private description: string;
  movieToEdit: any;

  constructor(private router: Router,
              private movieService: MovieService) {
    // this.title = this.movieToEdit.title;
  }
}
