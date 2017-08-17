import { Component, Input} from '@angular/core';
import {Movie} from '../../model/movie';
import {MovieService} from '../../service/movie/movie.service';
import {BasketService} from '../../service/basket/basket.service';
import 'rxjs/add/operator/map';
import {WishlistService} from '../../service/wishlist/wishlist.service';

@Component({
  moduleId: module.id,
  selector: 'm-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css']
})
export class GridComponent {
  @Input('movies')
  movies: Movie[];

  @Input('showAddToBasket')
  showAddToBasket: boolean;

  @Input('showAddToWishlist')
  showAddToWishlist: boolean;

  @Input('showPrice')
  showPrice: boolean;

  constructor(private basket: BasketService,
              private wishlist: WishlistService) {
    this.showAddToBasket = true;
    this.showAddToWishlist = true;
    this.showPrice = true;
  }

  movieAdded(movie: Movie) {
    this.basket.addToBasket(movie).subscribe();
  }

  movieAddedToWishlist(movie: Movie) {
    this.wishlist.addToWishlist(movie).subscribe();
  }
}
