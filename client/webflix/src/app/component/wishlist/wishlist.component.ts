import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {WishlistService} from '../../service/wishlist/wishlist.service';
import {WishlistSummary} from '../../model/wishlist-summary';
import {Movie} from '../../model/movie';
import {BasketService} from '../../service/basket/basket.service';


@Component({
  moduleId: module.id,
  selector: 'wishlist',
  styleUrls: ['wishlist.component.css'],
  templateUrl: 'wishlist.component.html',
})
export class WishlistComponent {
  summary;

  constructor(private wishlistService: WishlistService,
              private router: Router,
              private basketService: BasketService) {
    this.summary = WishlistSummary.empty();
    this.refreshSummary();
  }

  private refreshSummary(): void {
    this.wishlistService.getWishlistSummary()
      .subscribe(
        summary => {
          this.summary = summary;
        });
  }

  clearWishlist(): void {
    this.wishlistService.clearWishlist()
      .subscribe(() => this.refreshSummary());
  }

  removeMovie(movie: Movie): void {
    this.wishlistService.removeMovie(movie)
      .subscribe(() => this.refreshSummary());
  }

  addMovieToBasket(movie: Movie): void {
    this.basketService.addToBasket(movie)
      .subscribe(() => this.removeMovie(movie));
  }
}
