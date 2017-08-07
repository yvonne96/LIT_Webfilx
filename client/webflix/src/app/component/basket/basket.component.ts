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
  public globalMessage: string = '';
  public inUse: boolean = false;
  public discount: string = '';
  public subtotal: number;
  private voucherApplied: boolean;
  public vouchers: Voucher[];
  private globals: Voucher[];
  private globalVoucher: String = '';
  private globalSet: boolean;
  private used: number[];
  private checkIfApplied: boolean;
  private inUseVoucherId: number;
  public basketMovies: Movie[];
  private warningMessage: string = '';



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

    this.subtotal = 0;
    this.removeVoucher();
    this.voucherMessage = '';
    this.warningMessage = '';
  }

  removeMovie(movie: Movie): void {
    this.basketService.removeMovie(movie)
      .subscribe(() => this.refreshSummary());

    if (this.subtotal > this.summary.total) {
      this.subtotal = this.summary.total;
    }
    this.removeVoucher();
    this.globalSet = true;
    this.voucherMessage = '';
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
      this.globalSet = false;
      this.globalMessage = 'Global voucher has already been used.';
    } else {
      if (!this.checkIfDiscountApplied()) {
        this.warningMessage = '';
        this.inUseVoucherId = this.globals[0].id;
        this.discount = this.globals[0].offer;
        this.inUse = true;
        this.parseDiscount(this.discount);
        this.globalSet = false;
        this.checkIfApplied = true;
        this.voucherApplied = true;
      }
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
    this.globalMessage = '';
    if (!(name === '')) {
    this.voucherService.getVoucherValid(name.toUpperCase())
      .subscribe(
        (res) => {
          console.log(res);
          // FIX TO INCLUDE CHECK FOR EXPIRED DATE
          if (res === null) {
            this.warningMessage = name + ': Is not a valid voucher. Please check expiry date and voucher code.';
            this.voucherMessage = '';
            this.inUse = false;
          } else {
            console.log(this.used);
            if (this.used.indexOf(res.id) > -1) {
              this.warningMessage = 'Voucher has already been used.';
            } else {
              this.applyVoucher(res);
            }
          }
        });
    } else {
      this.voucherMessage = 'No voucher code entered';
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
    this.basketMovies = this.summary.movies;
    if (this.basketMovies.length < 2 ) {
      this.removeVoucher();
      this.voucherMessage = '';
      this.warningMessage = 'Not enough movies in basket to apply voucher.';
    } else if (this.basketMovies.length === 2) {
      if (this.summary.movies[0].price > this.summary.movies[1].price) {
        this.subtotal = this.summary.total - this.summary.movies[1].price;
      } else {
        this.subtotal = this.summary.total - this.summary.movies[0].price;
      }
      return this.subtotal;
    } else {
      this.removeVoucher();
      this.warningMessage = 'Too many movies in basket.';
    }
  }

  applyDiscountTwo(amountToSpend: number, amountOff: number) {
    if (this.summary.total < amountToSpend) {
      this.removeVoucher();
      this.warningMessage = 'You are not spending enough.';
    } else {
      this.subtotal = this.summary.total - amountOff;
      return this.subtotal;
    }
  }

  applyDiscountThree(percentOff: number) {
    if (this.summary.total === 0.00) {
      this.warningMessage = 'Not enough movies in basket to apply voucher.';
    } else {
      this.subtotal = this.summary.total * ((100.0 - percentOff) / 100.0);
      return this.subtotal;
    }
  }

  addUsedVoucher(usedVoucherId: number) {
     return this.voucherService.addUsedVoucher(this.inUseVoucherId)
       .subscribe();
  }

  private applyVoucher(res: Voucher): void {
    console.log(res);
    if (!this.checkIfDiscountApplied()) {
      this.checkIfApplied = true;
      this.warningMessage = '';
      this.voucherMessage = 'This voucher rewards you with: ' + res.offer;
      this.inUse = true;
      this.inUseVoucherId = res.id;
      this.discount = res.offer;
      this.voucherApplied = true;
      this.parseDiscount(this.discount);
    }
  }

  removeVoucher(): void {
    this.discount = '';
    this.subtotal = this.summary.total;
    this.inUse = false;
    this.checkIfApplied = false;
    this.warningMessage = 'Voucher removed please re-enter voucher code';
    this.voucherApplied = false;
    this.voucherMessage = '';
    this.globalSet = true;
  }

  checkIfDiscountApplied(): boolean {
    if (this.checkIfApplied === true) {
      if (confirm('A voucher is already applied. Changing the voucher may change the the cost. Do you wish to proceed?')) {
        this.removeVoucher();
        return false;
      } else {
        return true;
      }
    }
  }

}
