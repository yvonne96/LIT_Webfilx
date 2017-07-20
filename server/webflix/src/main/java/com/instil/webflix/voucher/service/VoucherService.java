package com.instil.webflix.voucher.service;

import com.instil.webflix.basket.model.Voucher;

public interface VoucherService {
	boolean getVoucherValid(Voucher voucher);
	
	Iterable<Voucher> getAllVouchers();
}
