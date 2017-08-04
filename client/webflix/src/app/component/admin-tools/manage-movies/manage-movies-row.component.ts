import {Component, Input,Output} from '@angular/core';
import {Movie} from '../../../model/movie';
import {MovieService} from '../../../service/movie/movie.service';
import {ActivatedRoute, Router, Route } from '@angular/router';
import {EditMovieComponent} from './edit-movie/edit-movie.component';

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
              private movieService: MovieService, private route: ActivatedRoute) {
    // this.setAllEditMoviesToFalse();
  }
  routeToEditMovieWithMovie() {
    const routes: Route = [
      {path: '', redirectTo : './edit-movie', pathMatch: 'full'},
      {path : 'edit-movie', component : EditMovieComponent, data : {id : '{theMovie.id}'}}
    ];
    this.router.navigate(routes);
  }
  addMovie(aMovie: Movie) {
    this.theMovie = aMovie;
  }
  getCurrentMovie() {
    return this.theMovie;
  }
}
