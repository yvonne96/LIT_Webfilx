/**
 * Created by n0289138 on 7/19/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Voucher} from '../../../model/voucher';
import {VoucherService} from '../../../service/voucher/voucher.service';
import {Observable} from 'rxjs/Observable';
import {error} from "selenium-webdriver";

@Component({
  moduleId: module.id,
  selector: 'manage-vouchers',
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
  private today: string;

  constructor(private voucherService: VoucherService) {
    this.receiveAllVouchers(this.voucherService.getAllVouchers());
    this.today = new Date().toJSON().split('T')[0];
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
    this.intializeDiscount();
    this.voucherService.createVoucher(this.code.toUpperCase(), this.discount , this.expiryDate)
        .subscribe(
          () => {this.refreshVouchers();
                this.refreshCreateVoucherForm();
            },
          error => {this.setCreateFailureMessage(); }
        );
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

  removeVoucher(voucher: Voucher){
    this.voucherService.removeVoucher(voucher)
      .subscribe(() => this.refreshVouchers());
  }

  receiveAllVouchers(source: Observable<Voucher[]>) {
    source
      .subscribe(vouchers => {
        this.vouchers = vouchers;
        this.sortVouchersByDate();
        this.sortVouchersByGlobal();
        console.log(vouchers);
      }, error => alert('Error getting vouchers'));
  }

  refreshVouchers() {
    this.voucherService.getAllVouchers()
      .subscribe(vouchers => {
        this.vouchers = vouchers;
        this.sortVouchersByDate();
        this.sortVouchersByGlobal();
      });
  }

  toggleGlobalButton(voucher: Voucher) {
    let global = true;
    if (voucher.global) {
      global = false;
    }
    this.voucherService.toggleGlobalVoucher(voucher, global)
      .subscribe(() => this.refreshVouchers());
  }

  sortVouchersByID() {
    this.vouchers.sort((firstVoucher, nextVoucher) => {
      if (firstVoucher.id < nextVoucher.id) {return -1; }
      if (firstVoucher.id > nextVoucher.id) {return 1; }
      return 0;
    });
  }

  sortVouchersByDate() {
    this.vouchers.sort((firstVoucher, nextVoucher) => {
      if (firstVoucher.expire < nextVoucher.expire) {return 1; }
      if (firstVoucher.expire > nextVoucher.expire) {return -1; }
      return 0;
    });
  }

  sortVouchersByGlobal() {
    this.vouchers.sort((firstVoucher, nextVoucher) => {
      if (firstVoucher.global === true) {return -1; }
      if (nextVoucher.global === true) {return 1; }
      return 0;
    });
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



