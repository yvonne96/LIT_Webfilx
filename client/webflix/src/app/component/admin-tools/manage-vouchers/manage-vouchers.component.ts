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
  private toggledBuyXGetYFree: boolean = false;
  private toggledPercentOff: boolean = false;
  private toggledSpendXGetYOff: boolean = false;
  private menuType: String;
  private vouchers: Voucher[];

  constructor(private voucherService: VoucherService) {
    this.fetchAllVouchers();
  }
  // removeVoucher(voucher: Voucher): void {
  //   this.VoucherService.removeVoucher(voucher)
  //     .subscribe(() => this.refreshSummary());
  // }


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
  uncheckRadio(voucher: Voucher) {
    voucher.global = false;
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
        console.log(vouchers);
      }, error => alert('Error getting vouchers'));
  }

  refreshVouchers() {
    this.voucherService.getAllVouchers()
      .subscribe(vouchers => this.vouchers = vouchers);
  }
  toggleGlobalButton(voucher: Voucher) {
    this.voucherService.toggleGlobalVoucher(voucher)
      .subscribe(() => this.refreshVouchers());
  }
}



