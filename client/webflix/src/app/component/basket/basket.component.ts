import {Component} from '@angular/core';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {Movie} from '../../model/movie';
import {Router} from '@angular/router';
import {VoucherService} from '../../service/voucher/voucher.service';

@Component({
  moduleId: module.id,
  selector: 'basket',
  templateUrl: 'basket.component.html'
})
export class BasketComponent {
  private summary: BasketSummary;
  public valid: boolean;
  public voucherMessage: string = '';
  public inUse: boolean = false;
  public discount: String = '';
  public subtotal: number;

  constructor(private basketService: BasketService,
              private router: Router,
              private voucherService: VoucherService) {
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

  checkVoucher(name: string) {
    this.voucherService.getVoucherValid(name.toUpperCase())
      .subscribe(
        (res) => {
          console.log(res);
          if (res === false) {
            this.voucherMessage = name + ': is not a valid voucher';
            this.inUse = false;
          } else {
            this.voucherMessage = 'This voucher rewards you with: ' + res.offer;
            this.inUse = true;
            this.discount = res.offer;
            this.applyDiscountOne(12, 12);
          }
        });
  }

  parseDiscount(offer: string) {
    let sliced = offer.split(' ');
    if (sliced[0] === 'BUY') {
      let amountToBuy = Number(sliced[1]);
      let amountFree = Number(sliced)[3];
      this.applyDiscountOne(amountToBuy, amountFree);
    } else {
      if (sliced[0] === 'SPEND') {
        let amountToSpend = Number(sliced[1]);
        let amountOff = Number(sliced[3]);
        this.applyDiscountTwo(amountToSpend, amountOff);
      } else {
        let percentOff = Number(sliced[0].slice(0, -1));
        return this.applyDiscountThree(percentOff);
      }
    }
  }

  applyDiscountOne(amountToBuy: number, amountFree: number) {
    console.log(this.summary);
    this.subtotal = this.summary.total - this.summary.movies[1].price;
  }

  applyDiscountTwo(amountToSpend: number, amountOff: number) {
    //
  }

  applyDiscountThree(percentOff: number) {
    //
  }

}
