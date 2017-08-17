import {Observable} from 'rxjs/Observable';
import {Voucher} from '../../model/voucher';

export abstract class VoucherService {
  abstract getVoucherValid(name: String): Observable<Voucher>;

  abstract getAllVouchers(): Observable<Voucher[]>;


  abstract removeVoucher(voucher: Voucher): Observable<boolean>;
  abstract toggleGlobalVoucher(voucher: Voucher, global: boolean): Observable<boolean>;
  abstract createVoucher(code: string, discount: string, expiryDate: Date):  Observable<boolean>;


  abstract getAllGlobalVouchers(): Observable<Voucher[]>;

  abstract getUsedVouchers(): Observable<number[]>;

  abstract addUsedVoucher(voucherId: number): Observable<boolean>;
}

