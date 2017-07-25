package com.instil.webflix.voucher.service;

import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.voucher.model.Voucher;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;



public class DbVoucherService implements VoucherService{
	
	@Autowired
	private VoucherRepository voucherRepository;
	
	
	public boolean getVoucherValid(String name) {
		Voucher voucher = voucherRepository.findByName(name);
		if (!(voucher == null)) {
			return true;
		}
		else
		{
			return false;
		}
	}
	
	public List<Voucher> getAllVouchers() {
		List<Voucher> stream = voucherRepository.findAll();
		return stream;
	}
	
	public List<Voucher> getAllGlobalVouchers() {
		List<Voucher> stream = voucherRepository.findByGlobalTrue();
		return stream;
	}
	

}
