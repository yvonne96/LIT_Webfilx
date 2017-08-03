import {Component, Input,Output} from '@angular/core';
import {Movie} from '../../../model/movie';
import {MovieService} from '../../../service/movie/movie.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: '[manage-movies-row]',
  templateUrl: 'manage-movies-row.component.html',
})
export class ManageMoviesRowComponent {
  desc: string = '';
  @Input('currentMovie')
  theMovie: any;
  @Input('showAddToBasket')
  showAddToBasket: boolean;
  @Input('showPrice')
  showPrice: boolean;
  // @Output()
  // this.theMovie();

  constructor(private router: Router,
              private movieService: MovieService) {
    // this.setAllEditMoviesToFalse();
  }

  addMovie(aMovie: Movie) {
    this.theMovie = aMovie;
  }
  getCurrentMovie() {
    return this.theMovie;
  }
}
