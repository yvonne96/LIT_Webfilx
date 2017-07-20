/**
 * Created by n0289138 on 7/19/2017.
 */
import {Component} from '@angular/core';
import {Router} from '@angular/router';

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

  constructor() {

  }

    setValue(menuSelection : String){
    this.menuType = menuSelection;
    this.chooseDiscountMenu();
  }

  chooseDiscountMenu() {

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
  }}



