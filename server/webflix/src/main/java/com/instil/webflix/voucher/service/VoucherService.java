package com.instil.webflix.voucher.service;

import com.instil.webflix.voucher.model.Voucher;

public interface VoucherService {
	boolean getVoucherValid(String name);
	
	Iterable<Voucher> getAllVouchers();
	void clearVoucher(int ID);
	
}
