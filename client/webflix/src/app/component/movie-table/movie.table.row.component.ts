import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {MovieService} from '../../service/movie/movie.service';
import {WishlistService} from '../../service/wishlist/wishlist.service';
import {WishlistSummary} from '../../model/wishlist-summary';

@Component({
  moduleId: module.id,
  selector: '[movie-table-row]',
  templateUrl: 'movie.table.row.component.html',
  styleUrls: ['movie.table.row.component.css']
})
export class MovieTableRowComponent {
  desc: string = '';
  descLen: number = 50;
  @Input('currentMovie')
  theMovie: any;
  @Input('showAddToBasket')
  showAddToBasket: boolean;
  @Input('showAddToWishlist')
  showAddToWishlist: boolean;
  @Input('showPrice')
  showPrice: boolean;
  @Output()
  onAddMovieToBasket = new EventEmitter<Movie>();
  @Output()
  onAddMovieToWishlist = new EventEmitter<Movie>();
  public summary: BasketSummary;
  public wishlistSummary: WishlistSummary;
  public myMovies: Movie[];

  constructor(private basketService: BasketService, private movieService: MovieService, private wishlistService: WishlistService) {
    this.summary = BasketSummary.empty();
    this.wishlistSummary = WishlistSummary.empty();
    this.readBasketForUser();
    this.readWishlistForUser();
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
    if (this.checkForMovieDuplicates()) {
      alert('Already bought!!');
    } else if (this.checkForWishlistDuplicates()) {
      alert('Already in wishlist');
    } else if (this.checkForBasketDuplicates()) {
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

  private readWishlistForUser() {
    this.wishlistService.getWishlistSummary()
      .subscribe(
        summary => this.wishlistSummary = summary
      );
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
}

