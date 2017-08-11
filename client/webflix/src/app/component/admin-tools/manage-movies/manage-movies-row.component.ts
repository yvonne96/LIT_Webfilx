import {Component, Input,Output} from '@angular/core';
import {Movie} from '../../../model/movie';
import {MovieService} from '../../../service/movie/movie.service';
import {ActivatedRoute, Router, Route } from '@angular/router';
import {EditMovieComponent} from './edit-movie/edit-movie.component';

@Component({
  moduleId: module.id,
  selector: '[manage-movies-row]',
  templateUrl: 'manage-movies-row.component.html',
  styleUrls: ['manage-movies.component.css'],
})

export class ManageMoviesRowComponent {
  desc: string = '';
  descLen: number = 100;
  @Input('currentMovie')
  theMovie: any;
  @Input('showAddToBasket')
  showAddToBasket: boolean;
  @Input('showPrice')
  showPrice: boolean;


  constructor(private router: Router,
              private movieService: MovieService, private route: ActivatedRoute) {
  }
  addMovie(aMovie: Movie) {
    this.theMovie = aMovie;
  }
  getCurrentMovie() {
    return this.theMovie;
  }

  showDescription() {
    this.desc = this.theMovie.description.slice(0, this.descLen);
    this.desc += '...';
  }

  hideDescription() {
    this.desc = '';
  }
  togglePurchasableMovie(movie: Movie){
    this.movieService.togglePurchasableMovie(movie)
      .subscribe();
  }
}
