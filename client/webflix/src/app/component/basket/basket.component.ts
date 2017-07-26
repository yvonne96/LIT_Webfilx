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
  templateUrl: 'basket.component.html'
})
export class BasketComponent {
  private summary: BasketSummary;
  public valid: boolean;
  public voucherMessage: string = '';
  public inUse: boolean = false;
  public discount: string = '';
  public subtotal: number;
  public currentOffer: string;
  public vouchers: Voucher[];
  private globals: Voucher[];
  private globalVoucher: string = '';
  private globalSet: boolean;
  private used: number[];
  private inUseVoucherId: number;
  private apply: boolean = true;

  constructor(private basketService: BasketService,
              private router: Router,
              private voucherService: VoucherService) {
    this.summary = BasketSummary.empty();
    this.fetchAllVouchers();
    this.refreshSummary();
    this.fetchAllGlobalVouchers();
    this.fetchUsedVouchers();
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
      this.addUsedVoucher(this.inUseVoucherId);
      this.basketService.checkout()
        .subscribe(
          success => this.router.navigate(['/dashboard']),
          error => console.log('Error checking out - ' + error));
    }
  }

  logDate() {
    return Date.now();
  }

  private setGlobal() {
    if (this.used.indexOf(this.globals[0].id) > -1) {
      console.log('Global has already been used');
    } else {
      this.discount = this.globals[0].offer;
      this.inUse = true;
      this.parseDiscount(this.discount);
      this.globalSet = false;
    }
  }


  private refreshSummary(): void {
    this.basketService.getBasketSummary()
      .subscribe(
        summary => {
          this.summary = summary;
          this.subtotal = this.summary.total;
        });
  }

  fetchUsedVouchers(): void {
    this.getUsedVouchers(this.voucherService.getUsedVouchers());
  }

  getUsedVouchers(source: Observable<number[]>) {
    return source.subscribe(vouchers => {
      this.used = vouchers;
    }, error => this.router.navigate(['/login']));
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

  fetchAllGlobalVouchers(): void {
    this.getAllGlobalVouchers(this.voucherService.getAllGlobalVouchers());
  }

  getAllGlobalVouchers(source: Observable<Voucher[]>) {
    const voucherGetter = source
      .subscribe(globals => {
        console.log(globals);
        this.globals = globals;
        this.globalVoucher = globals[0].offer;
        this.globalSet = true;
      }, error => this.router.navigate(['/login']));
    return voucherGetter;
  }

  checkVoucher(name: string) {
    if (!(name === '')) {
    this.voucherService.getVoucherValid(name.toUpperCase())
      .subscribe(
        (res) => {
          console.log(res);
          if (res === false || res.expire <= this.logDate()) {
            this.voucherMessage = name + ': Is not a valid voucher or has expired';
            this.inUse = false;
          } else {
            console.log(this.used);
            if (this.used.indexOf(res.id) > -1) {
              this.apply = false;
            } else {
              this.apply = true;
            }
            if (this.apply) {
              this.voucherMessage = 'This voucher rewards you with: ' + res.offer;
              this.inUse = true;
              this.inUseVoucherId = res.id;
              this.discount = res.offer;
              this.parseDiscount(this.discount);
              if (this.globals !== []) {
                this.globalSet = true;
              }
            } else {
              this.voucherMessage = 'Already used this voucher';
            }
          }
        });
    } else {
      console.log('no voucher entered');
    }
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
    if (this.summary.movies.length < amountToBuy + amountFree) {
      console.log('Not enough in basket to apply');
    } else {
      this.subtotal = this.summary.total - this.summary.movies[1].price;
      return this.subtotal;
    }
  }

  applyDiscountTwo(amountToSpend: number, amountOff: number) {
    if (this.summary.total < amountToSpend) {
      console.log('You are not spending enough');
    } else {
      this.subtotal = this.summary.total - amountOff;
      return this.subtotal;
    }
  }

  applyDiscountThree(percentOff: number) {
    if (this.summary.total === 0.00) {
      console.log('Not enough movies in basket to apply voucher');
    } else {
      this.subtotal = this.summary.total * ((100.0 - percentOff) / 100.0);
      return this.subtotal;
    }

  }

  addUsedVoucher(usedVoucherId: number) {
     return this.voucherService.addUsedVoucher(this.inUseVoucherId)
       .subscribe();
  }

}
