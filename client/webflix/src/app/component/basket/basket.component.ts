import {Component} from '@angular/core';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {Movie} from '../../model/movie';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'basket',
  templateUrl: 'basket.component.html'
})
export class BasketComponent {
  private summary: BasketSummary;

  constructor(private basketService: BasketService,
              private router: Router) {
    this.summary = BasketSummary.empty();
    this.refreshSummary();
  }

  clearBasket(): void {
    this.basketService.clearBasket()
      .subscribe(() => this.refreshSummary());
  }

  removeMovie(movie: Movie): void {
    this.basketService.removeMovie(movie)
      .subscribe(() => this.refreshSummary());
  }

  checkout(): void {
    if (confirm('Are you sure you want to purchase?')) {
      this.basketService.checkout()
        .subscribe(
          success => this.router.navigate(['/dashboard']),
          error => console.log('Error checking out - ' + error));
    }
  }

  private refreshSummary(): void {
    this.basketService.getBasketSummary()
      .subscribe(
        summary => this.summary = summary);
  }
}
