package com.instil.webflix.voucher.service;

import com.instil.webflix.basket.data.BasketItemRepository;
import com.instil.webflix.basket.data.BasketRepository;
import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.basket.model.BasketSummary;
import com.instil.webflix.voucher.model.Voucher;
import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.movies.model.BasketItem;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;



import java.util.Date;
import java.util.List;

import static java.util.stream.Collectors.*;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DbVoucherService implements VoucherService {
	
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
	
	public void clearVoucher(int ID){
		voucherRepository.deleteById(ID);
	}
	

	
}
