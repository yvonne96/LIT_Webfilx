import {Component} from '@angular/core';
import {BasketService} from '../../service/basket/basket.service';

@Component({
  moduleId: module.id,
  selector: 'basket-button',
  templateUrl: 'basket-button.component.html'
})
export class BasketButtonComponent {
  public itemCount: number;

  constructor(private basketService: BasketService) {
    this.readItemCountForUser();
    this.basketService.basketCount.subscribe(
      value => this.itemCount = value
    );
  }

  private readItemCountForUser() {
    this.basketService.getBasketItemCount()
      .subscribe(value => this.itemCount = value);
  }
}
