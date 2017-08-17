import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {BasketService} from '../../service/basket/basket.service';
import {MovieService} from '../../service/movie/movie.service';

@Component({
  moduleId: module.id,
  selector: 'basket-button',
  templateUrl: 'basket-button.component.html'
})
export class BasketButtonComponent {

  public itemCount: number;

  constructor(private basketService: BasketService,
              private movieService: MovieService) {
    this.readItemCountForUser();
    this.basketService.basketCount.subscribe(
      value => this.itemCount = value
    );
  }

  private readItemCountForUser() {
    this.basketService.getBasketItemCount()
      .subscribe(value => this.itemCount = value);
  }

  refreshItemCount() {
    this.basketService.basketCount
      .subscribe(value => this.itemCount = value);
  }

}
