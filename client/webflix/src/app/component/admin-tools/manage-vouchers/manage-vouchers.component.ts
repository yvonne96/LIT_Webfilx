/**
 * Created by n0289138 on 7/19/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Voucher} from '../../../model/voucher';
import {VoucherService} from '../../../service/voucher/voucher.service';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'manage-vouchers',
  templateUrl: 'manage-vouchers.component.html'
})
export class ManageVouchersComponent {
  private code: string;
  private expiryDate: Date;
  private discount: string;
  private toggledBuyXGetYFree: boolean = false;
  private toggledPercentOff: boolean = false;
  private toggledSpendXGetYOff: boolean = false;
  private menuType: String;
  private vouchers: Voucher[];

  constructor(private voucherService: VoucherService) {
    this.fetchAllVouchers();
  }

  createVoucher() {
    // SORT OUT DISCOUNT
    this.voucherService.createVoucher(this.code, this.discount, this.expiryDate)
      .subscribe(() => this.refreshVouchers());
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

  fetchAllVouchers() {
    this.receiveAllVouchers(this.voucherService.getAllVouchers());
  }

  removeVoucher(voucher: Voucher){
    this.voucherService.removeVoucher(voucher)
      .subscribe(() => this.refreshVouchers());
  }

  receiveAllVouchers(source: Observable<Voucher[]>) {
    source
      .subscribe(vouchers => {
        this.vouchers = vouchers;
        this.sortVouchersByGlobal();
        console.log(vouchers);
      }, error => alert('Error getting vouchers'));
  }

  refreshVouchers() {
    this.voucherService.getAllVouchers()
      .subscribe(vouchers => {
        this.vouchers = vouchers;
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



