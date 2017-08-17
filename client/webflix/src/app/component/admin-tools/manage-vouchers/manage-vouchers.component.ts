/**
 * Created by n0289138 on 7/19/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Voucher} from '../../../model/voucher';
import {VoucherService} from '../../../service/voucher/voucher.service';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../service/authentication/authentication.service';
import {MovieService} from '../../../service/movie/movie.service';
import {Movie} from '../../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'manage-vouchers',
  styleUrls: ['manage-vouchers.component.css'],
  templateUrl: 'manage-vouchers.component.html'
})
export class ManageVouchersComponent {
  private code: string;
  private expiryDate: Date;
  private toggledBuyXGetYFree: boolean = false;
  private toggledPercentOff: boolean = false;
  private toggledSpendXGetYOff: boolean = false;
  private discountX: string;
  private discountY: string;
  private discount: string;
  private menuType: String;
  private errorMessage: String;
  private vouchers: Voucher[];
  private movies: Movie[];
  private dateTomorrow: Date;
  private tomorrow: string;
  private isAdmin: boolean;
  private sortDateOn: boolean = true;
  private sortCodeOn: boolean = false;
  private sortGlobalOn: boolean = false;
  private sortDiscountOn: boolean = false;



  constructor(private voucherService: VoucherService, private router: Router,
              private authenticationService: AuthenticationService,
              private movieService: MovieService) {
    this.receiveAllVouchers(this.voucherService.getAllVouchers());
    this.receiveAllMovies(this.movieService.fetchAllMovies());
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
    this.dateTomorrow = new Date();
    this.dateTomorrow.setDate(this.dateTomorrow.getDate() + 1);
    this.tomorrow = this.dateTomorrow.toJSON().split('T')[0];
    this.refreshVouchers();
  }


  refreshCreateVoucherForm() {
    let resetForm = <HTMLFormElement>document.getElementById('createVouchers');
    this.toggledBuyXGetYFree = false;
    this.toggledPercentOff = false;
    this.toggledSpendXGetYOff = false;
    this.errorMessage = '';
    resetForm.reset();
  }

  createVoucher() {
    if (this.validVoucherParams()) {
      this.intializeDiscount();
      this.voucherService.createVoucher(this.code.toUpperCase(), this.discount, this.expiryDate)
        .subscribe(
          () => {
            this.refreshVouchers();
            this.refreshCreateVoucherForm();
          },
          error => {
            this.setCreateFailureMessage();
          }
        );
    }
  }

  validVoucherParams(): boolean {
    if (!this.voucherCodeNotUsed()) {
      this.errorMessage = 'Error - the code you supplied is already in use';
      return false;
    }

    switch (this.menuType) {
      case 'buyXGetY':
        if (!this.validBuyXGetYParams()) {
          return false;
        }
        break;
      case 'spendXGetY':
        if (!this.validSpendXGetYParams()) {
          return false;
        }
        break;
    }
    return true;
  }

  validBuyXGetYParams(): boolean {
    if (Number(this.discountX) > this.movies.length || Number(this.discountX) < 1) {
      this.errorMessage = 'Error - Buy X Get Y Free, X is either larger than total movies stored or less than 1';
      return false;
    } else if (Number(this.discountY) > this.movies.length || Number(this.discountY) < 1) {
      this.errorMessage = 'Error - Buy X Get Y Free, Y is either larger than total movies stored or less than 1';
      return false;
    }
    return true;
  }

  validSpendXGetYParams(): boolean {
    if (Number(this.discountX) < 1) {
      this.errorMessage = 'Error - Spend X Get Y Off, X is less than 1';
      return false;
    } else if (Number(this.discountX) < Number(this.discountY)) {
      this.errorMessage = 'Error - Spend X Get Y Off, X is less than Y';
      return false;
    } else if (Number(this.discountY) < 1) {
      this.errorMessage = 'Error - Spend X Get Y Off, Y is less than 1';
      return false;
    }
    return true;
  }

  voucherCodeNotUsed(): boolean {
    for (let v of this.vouchers){
      if (v.name.toUpperCase() === this.code.toUpperCase()) {
        return false;
      }
    }
    return true;
  }

  setCreateFailureMessage() {
    this.errorMessage = 'Create voucher failed. Make sure code is not a duplicate. Please try again';
  }

  chooseDiscountMenu(menuSelection: String) {
    this.menuType = menuSelection;
    switch (this.menuType) {
      case 'buyXGetY':
        this.toggledPercentOff = false;
        this.toggledBuyXGetYFree = true;
        this.toggledSpendXGetYOff = false;
        break;

      case 'percentage':
        this.toggledPercentOff = true;
        this.toggledBuyXGetYFree = false;
        this.toggledSpendXGetYOff = false;
        break;

      case 'spendXGetY':
        this.toggledPercentOff = false;
        this.toggledBuyXGetYFree = false;
        this.toggledSpendXGetYOff = true;
        break;

      default:
        this.toggledPercentOff = false;
        this.toggledBuyXGetYFree = false;
        this.toggledSpendXGetYOff = false; }
  }

  intializeDiscount() {
    switch (this.menuType) {
      case 'buyXGetY':
        this.discount = 'BUYi' + this.discountX + 'iGETi' + this.discountY + 'iFREE';
        break;

      case 'percentage':
        this.discount = this.discountX + 'piOFF';
        break;

      case 'spendXGetY':
        this.discount = 'SPENDi' + this.discountX + 'iGETi' + this.discountY + 'iOFF';
        break;

      default:
        this.discount = 'MONEY MONEY MONEY (da dum) MUST BE FUNNY (da dum) IN A RICH MANS WORLD!!';
    }
  }

  removeVoucher(voucher: Voucher) {
    this.voucherService.removeVoucher(voucher)
      .subscribe(() => this.refreshVouchers());
  }

  receiveAllVouchers(source: Observable<Voucher[]>) {
    source
      .subscribe(vouchers => {
        this.vouchers = vouchers;
        this.intializeSort();
      }, error => alert('Error getting vouchers'));
  }

  receiveAllMovies(source: Observable<Movie[]>) {
    source
      .subscribe(movies => {
        this.movies = movies;
      }, error => alert('Error getting movies'));
  }

  refreshVouchers() {
    this.voucherService.getAllVouchers()
      .subscribe(vouchers => {
        this.vouchers = vouchers;
        this.intializeSort();
      });
  }


  intializeSort() {
    if (this.sortDateOn) {
      this.chooseSortMethod('DATE');
    }
    if (this.sortCodeOn) {
      this.chooseSortMethod('CODE');
    }
    if (this.sortGlobalOn) {
      this.chooseSortMethod('GLOBAL');
    }
    if (this.sortDiscountOn) {
      this.chooseSortMethod('DISCOUNT');
    }
  }

  chooseSortMethod(sortMethod: string) {
    switch (sortMethod) {
      case 'CODE':
        this.sortGlobalOn = false;
        this.sortDateOn = false;
        this.sortCodeOn = true;
        this.sortDiscountOn = false;
        this.vouchers.sort((firstVoucher, nextVoucher) => {
          if (firstVoucher.name < nextVoucher.name) {return -1; }
          if (firstVoucher.name > nextVoucher.name) {return 1; }
          return 0;
        });
        break;

      case 'DISCOUNT':
        this.sortGlobalOn = false;
        this.sortDateOn = false;
        this.sortCodeOn = false;
        this.sortDiscountOn = true;
        this.vouchers.sort((firstVoucher, nextVoucher) => {
          if (firstVoucher.offer < nextVoucher.offer) {return -1; }
          if (firstVoucher.offer > nextVoucher.offer) {return 1; }
          return 0;
        });
        break;

      case 'GLOBAL':
        this.sortGlobalOn = true;
        this.sortDateOn = false;
        this.sortCodeOn = false;
        this.sortDiscountOn = false;
        this.vouchers.sort((firstVoucher, nextVoucher) => {
          if (firstVoucher.global === true) {return -1; }
          if (nextVoucher.global === true) {return 1; }
          return 0;
        });
        break;

      default:
        this.sortGlobalOn = false;
        this.sortDateOn = true;
        this.sortCodeOn = false;
        this.sortDiscountOn = false;
        this.vouchers.sort((firstVoucher, nextVoucher) => {
          if (firstVoucher.expire < nextVoucher.expire) {return 1; }
          if (firstVoucher.expire > nextVoucher.expire) {return -1; }
          return 0;
        });
    }
  }


  toggleGlobalButton(voucher: Voucher) {
    let global = true;
    if (voucher.global) {
      global = false;
    }
    this.voucherService.toggleGlobalVoucher(voucher, global)
      .subscribe(() => this.refreshVouchers());
  }

  getVoucherRowStyle(expired: boolean): String{
    if (expired) {
      return 'red';
    }
    return 'black';
  }
  checkVoucherExpired(voucher: Voucher): boolean {
    let currentDate = new Date();
    if (currentDate > voucher.expire) {
      return true;
    }
    return false;
  }
}



