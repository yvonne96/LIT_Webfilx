package com.instil.webflix.voucher.service;

import java.util.List;

import com.instil.webflix.voucher.model.Voucher;

public interface VoucherService {
	boolean getVoucherValid(String name);
	
	List<Voucher> getAllVouchers();
	
	
}
