import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import {VoucherService} from './voucher.service';
import {RestService} from '../api-client/rest.service';
import {Voucher} from '../../model/voucher';
import {map} from "rxjs/operator/map";

const baseUrl = '/voucher';

@Injectable()
export class HttpVoucherService extends VoucherService {

  constructor(private http: Http,
              private restService: RestService) {
    super();
  }

  getVoucherValid(name: String): Observable<Boolean> {
    return this.restService.get(baseUrl + '/' + name)
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('error readying voucher');
        return Observable.of(false);
      });
  }

  getAllVouchers(): Observable<Voucher[]> {
    return this.restService.get(baseUrl)
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('unable to retrieve vouchers');
        return Observable.of([]);
      });

  }

  createVoucher(code: string, discount: string, expiryDate: Date): Observable<Boolean> {
    console.log(baseUrl + '/' + code + '/' + discount + '/' + expiryDate);
    let expiryDateNew = new Date(expiryDate);
    // let newdiscount = String(discount);
    return this.restService.post(baseUrl + '/' + code + '/' + discount + '/' + expiryDateNew)
      // .addHeader('Access-Control-Allow-Origin', '*')
      .build()
      .map(() => true);
  }

  removeVoucher(voucher: Voucher): Observable<Boolean> {
    return this.restService.delete(baseUrl + '/' + voucher.id)
      .build()
      .map(() => true)
      .catch(error => {
      console.log('unable to remove voucher');
      return Observable.of(false);
      });
  }
  toggleGlobalVoucher(voucher: Voucher, global: boolean): Observable<Boolean> {
    // console.log(voucher.global);
    return this.restService.post(baseUrl + '/' + voucher.id  + '/' + global)
      .build()
      .map(() => true)
      .catch(error => {
        console.log('unable to change global');
        return Observable.of(false);
      });
  }
}

