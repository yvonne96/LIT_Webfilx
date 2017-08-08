import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';
import {Http, } from '@angular/http';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {MovieService} from '../../service/movie/movie.service';

import 'rxjs/add/operator/toPromise';


@Component({
  moduleId: module.id,
  selector: '[movie-grid]',
  templateUrl: 'movie.grid.component.html',
  styleUrls: ['movie.grid.component.css']
})
export class MovieGridComponent {
  desc: string = '';
  descLen: number = 100;
  @Input('currentMovie')
  theMovie: any;
  @Input('showAddToBasket')
  showAddToBasket: boolean;
  @Input('showPrice')
  showPrice: boolean;
  @Output()
  onAddMovieToBasket = new EventEmitter<Movie>();
  @Output()
    onAddMovieToWishlist = new EventEmitter<Movie>();
  info: string = '';
  image: string = '';
  isSet: boolean = false;
  public summary: BasketSummary;
  public myMovies: Movie[];


  constructor(private http: Http,
              private basketService: BasketService,
              private movieService: MovieService) {
    this.summary = BasketSummary.empty();
    this.readBasketForUser();
    this.readMyMoviesForUser();
  }

  addMovieToBasket(): void {
    if (this.checkForMovieDuplicates()) {
      alert('Already bought!!');
    } else if (this.checkForBasketDuplicates()) {
      alert('Already in basket!!');
    } else {
      this.showAddToBasket = true;
      this.showPrice = true;
      this.onAddMovieToBasket.emit(this.theMovie);
    }
  }
  
  addMovieToWishlist(): void {
    this.onAddMovieToWishlist.emit(this.theMovie);
  }
  
  private readBasketForUser() {
    this.basketService.getBasketSummary()
      .subscribe(
        summary => this.summary = summary);
  }
  private readMyMoviesForUser() {
    this.movieService.fetchMyMovies()
      .subscribe(
        myMovies => this.myMovies = myMovies );
  }
  checkForMovieDuplicates(): boolean {
    let checkMovies: Movie[] = this.myMovies;
    for (let m = 0; m < checkMovies.length; m++) {
      if (this.theMovie.id === checkMovies[m].id) {
        return true;
      }
    }
    return false;
  }
  checkForBasketDuplicates(): boolean {
    let basketMovies: Movie[] = this.summary.movies;
    for (let n = 0; n < basketMovies.length; n++) {
      if (this.theMovie.id === basketMovies[n].id) {
        return true;
      }
    }
    this.summary.movies.push(this.theMovie);
    return false;
  }

  showDescription() {
    this.desc = this.theMovie.description.slice(0, this.descLen);
  }

  hideDescription() {
    this.desc = '';
  }

  showInfo() {
    this.info = 'Genre: ' + this.theMovie.genre.value
      + ', Classification: ' + this.theMovie.classification.value
      + ', Year: ' + this.theMovie.year;
  }

  hideInfo() {
    this.info = '';
  }

  setImageData() {
    return this.image;
  }

}
