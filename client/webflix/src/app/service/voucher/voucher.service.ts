import {Observable} from 'rxjs/Observable';
import {Voucher} from '../../model/voucher';

export abstract class VoucherService {
  abstract getVoucherValid(name: String): Observable<boolean>;

  abstract getAllVouchers(): Observable<Voucher[]>;

  abstract removeVoucher(voucher: Voucher): Observable<boolean>;
  abstract toggleGlobalVoucher(voucher: Voucher, global: boolean): Observable<boolean>;
  abstract createVoucher(code: string, discount: string, expiryDate: Date):  Observable<boolean>;
}
