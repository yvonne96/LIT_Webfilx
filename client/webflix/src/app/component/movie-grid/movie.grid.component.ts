import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {MovieService} from '../../service/movie/movie.service';
import {WishlistService} from '../../service/wishlist/wishlist.service';
import {WishlistSummary} from '../../model/wishlist-summary';

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
  @Input('showAddToWishlist')
  showAddToWishlist: boolean;
  @Input('showPrice')
  showPrice: boolean;
  @Input('showFavorites')
  showFavorites: boolean;
  @Output()
  onAddMovieToBasket = new EventEmitter<Movie>();
  @Output()
  onAddMovieToWishlist = new EventEmitter<Movie>();
  info: string = '';
  image: string = '';
  isSet: boolean = false;
  public summary: BasketSummary;
  public wishlistSummary: WishlistSummary;
  public myMovies: Movie[];


  constructor(private basketService: BasketService,
              private movieService: MovieService,
              private wishlistService: WishlistService) {
    this.summary = BasketSummary.empty();
    this.wishlistSummary = WishlistSummary.empty();
    this.readWishlistForUser();
    this.readBasketForUser();
    this.readMyMoviesForUser();
  }

  addMovieToBasket(): void {
    if (this.checkForMovieDuplicates()) {
      alert('Already bought!!');
    } else if (this.checkForBasketDuplicates()) {
      alert('Already in basket!!');
    } else {
      if (this.wishlistSummary.movies.indexOf(this.theMovie)) {
        this.wishlistService.removeMovie(this.theMovie)
          .subscribe(res => {console.log(res); } );
      }
      this.showAddToBasket = true;
      this.showPrice = true;
      this.onAddMovieToBasket.emit(this.theMovie);
    }
  }

  addMovieToWishlist(): void {
    if (this.checkForMovieDuplicates()) {
      alert('Already bought!!');
    } else if (this.checkForWishlistDuplicates()) {
      alert('Already in wishlist');
    } else if (this.checkForBasketDuplicates()){
      alert('Already in basket');
    } else {
      this.showAddToWishlist = true;
      this.onAddMovieToWishlist.emit(this.theMovie);
    }

  }

  private readBasketForUser() {
    this.basketService.getBasketSummary()
      .subscribe(
        summary => this.summary = summary);
  }

  private readWishlistForUser() {
    this.wishlistService.getWishlistSummary()
      .subscribe(
        summary => this.wishlistSummary = summary
      );
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

  checkForWishlistDuplicates() {
    let wishlistMovies: Movie[] = this.wishlistSummary.movies;
    for (let n = 0; n < wishlistMovies.length; n++) {
      if (this.theMovie.id === wishlistMovies[n].id) {
        return true;
      }
    }
    this.wishlistSummary.movies.push(this.theMovie);
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

  // getImageData() {
  //   const data =  this.http
  //     .get('https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + this.theMovie.title)
  //     .subscribe(dat => {
  //       this.image = dat.json().results[0].poster_path;
  //       this.desc = dat.json().results[0].overview;
  //      this.isSet = true;
  //     });
  //   if (this.image !== '') {
  //     data.unsubscribe();
  //     console.log(this.image);
  //     return this.image;
  //   }
  // }

  setImageData() {
    return this.image;
  }

}
