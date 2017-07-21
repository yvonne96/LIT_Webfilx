import {Observable} from 'rxjs/Observable';
import {Voucher} from '../../model/voucher';

export abstract class VoucherService {
  abstract getVoucherValid(name: String): Observable<boolean>;

  abstract getAllVouchers(): Observable<Voucher[]>;

  abstract removeVoucher(voucher: Voucher): Observable<boolean>;
}
