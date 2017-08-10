import {Component} from '@angular/core';
import {WishlistService} from '../../service/wishlist/wishlist.service';


@Component({
  moduleId: module.id,
  selector: 'wishlist-button',
  templateUrl: 'wishlist-button.component.html'
})
export class WishlistButtonComponent {
  public itemCount: number;

  constructor(private wishlistService: WishlistService) {
    this.readItemCountForUser();
    this.wishlistService.wishlistCount.subscribe(
      value => this.itemCount = value
    );
  }

  private readItemCountForUser() {
    this.wishlistService.getWishlistItemCount()
      .subscribe(value => this.itemCount = value);
  }
}
