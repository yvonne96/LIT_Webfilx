package com.instil.webflix.voucher.service;


import java.util.Date;

import java.util.List;

import com.instil.webflix.voucher.model.Voucher;

public interface VoucherService {
	boolean getVoucherValid(String name);

	void createVoucher(String code, String discount, Date expiryDate);
	void checkForExpiredGlobal();

	
	List<Voucher> getAllVouchers();

}
