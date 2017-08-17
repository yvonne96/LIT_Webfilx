import {Component, Input} from '@angular/core';
import 'rxjs/add/operator/map';
import {Movie} from '../../model/movie';
import {BasketService} from '../../service/basket/basket.service';
import {WishlistService} from '../../service/wishlist/wishlist.service';
import {MovieService} from '../../service/movie/movie.service';
import {Observable} from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'movie-table',
  templateUrl: 'movie-table.component.html',
  styleUrls: ['movie-table.component.css']
})
export class MovieDisplayComponent {
  @Input('movies')
  movies: Movie;

  @Input('showAddToBasket')
  showAddToBasket: boolean;

  @Input('showAddToWishlist')
  showAddToWishlist: boolean;

  @Input('showPrice')
  showPrice: boolean;

  @Input('showFavorites')
  showFavorites: boolean;



  constructor(private basket: BasketService,
              private moviesService: MovieService,  private wishlist: WishlistService) {

    this.showAddToBasket = true;
    this.showAddToWishlist = true;
    this.showPrice = true;
  }

  movieAdded(movie: Movie) {
    this.basket.addToBasket(movie).subscribe();
  }

  wishlistMovieAdded(movie: Movie) {
    this.wishlist.addToWishlist(movie).subscribe();
  }

}
