import {Component} from '@angular/core';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {Movie} from '../../model/movie';
import {Router} from '@angular/router';
import {VoucherService} from '../../service/voucher/voucher.service';
import {Voucher} from '../../model/voucher';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'basket',
  templateUrl: 'basket.component.html',
  styleUrls: ['basket.component.css']
})
export class BasketComponent {
  private summary: BasketSummary;
  public valid: boolean;
  public voucherMessage: string = '';
  public inUse: boolean = false;
  public discount: String = '';
  public subtotal: number;
  private voucherApplied: boolean;
  public vouchers: Voucher[];
  public testMovies: Movie[];



  constructor(private basketService: BasketService,
              private router: Router,
              private voucherService: VoucherService) {
    this.summary = BasketSummary.empty();
    this.fetchAllVouchers();
    this.refreshSummary();
  }

  clearBasket(): void {
    this.basketService.clearBasket()
      .subscribe(() => this.refreshSummary());

    this.removeVoucher();
    this.voucherMessage = 'Movies removed';
    this.subtotal = 0;
  }

  removeMovie(movie: Movie): void {
    this.basketService.removeMovie(movie)
      .subscribe(() => this.refreshSummary());

    if (this.subtotal > this.summary.total) {
      this.subtotal = this.summary.total;
    }
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

  fetchAllVouchers(): void {
    this.getAllVouchers(this.voucherService.getAllVouchers());
  }

  getAllVouchers(source: Observable<Voucher[]>) {
    const voucherGetter = source
      .subscribe(vouchers => {
        this.vouchers = vouchers;
      }, error => this.router.navigate(['/login']));
    return voucherGetter;
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
            this.voucherApplied = true;
            this.parseDiscount(res.offer);
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
    this.subtotal = this.summary.total;
    this.testMovies = this.summary.movies;
    if (this.testMovies.length === 1 || this.testMovies.length < 1) {
      this.removeVoucher();
      this.voucherMessage = 'Not enough movies in basket';
    } else if (this.testMovies.length > 1) {
      if (this.summary.movies[0].price > this.summary.movies[1].price) {
        this.subtotal = this.summary.total - this.summary.movies[1].price;
      } else {
        this.subtotal = this.summary.total - this.summary.movies[0].price;
      }
    }
  }

  applyDiscountTwo(amountToSpend: number, amountOff: number) {
    //
  }

  applyDiscountThree(percentOff: number) {
    this.subtotal = this.summary.total * ((100.0 - percentOff) / 100.0);
  }

  removeVoucher(): void {
    this.discount = '';
    this.subtotal = this.summary.total;
    this.inUse = false;
    this.voucherMessage = 'Voucher removed please re-enter voucher code';
    this.voucherApplied = false;
  }


}
