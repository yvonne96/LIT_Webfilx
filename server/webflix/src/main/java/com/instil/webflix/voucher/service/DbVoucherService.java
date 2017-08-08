package com.instil.webflix.voucher.service;


import com.instil.webflix.basket.data.BasketItemRepository;
import com.instil.webflix.basket.data.BasketRepository;
import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.basket.model.BasketSummary;
import com.instil.webflix.voucher.model.Voucher;

import ch.qos.logback.classic.Logger;

import com.instil.webflix.movies.data.MovieRepository;
import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.movies.model.BasketItem;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;



import java.util.Date;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import static java.util.stream.Collectors.*;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DbVoucherService implements VoucherService {
	private final Log logger = LogFactory.getLog(this.getClass());

	
	@Autowired
	private VoucherRepository voucherRepository;
	

	@Autowired
	private MovieRepository movieRepository;
	

	
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
	

	public void createVoucher(String code, String discount, Date expiryDate){
		if(validVoucher(code, discount, expiryDate)){
			voucherRepository.addVoucher(code, discount, expiryDate);
		}
		else{
			logger.info("Voucher was not created");
		}
	}
	
	public boolean validVoucher(String code, String discount, Date expiryDate){
		final String errorMsgStart = "Error creating voucher - ";
		Date currentDate = new Date();
		String discountType = discount.split(" ")[0];
		String[] discountComponents = discount.split(" ");
		
		if(!validFormat(discount)){
			return false;
		}
		
		if(discountType.contains("%")){
			discountType = "DISCOUNT";
		}
		
		if(expiryDate.getTime() < currentDate.getTime()){
			logger.info(errorMsgStart + "Expiry Date supplied is already out-of-date");
			return false;
		}
		
		for(Voucher v : voucherRepository.findAll()){
			if(v.getName().equals(code)){
				logger.info(errorMsgStart + "Code supplied is already in use");
				return false;
			}
		}
		
		if(!validDiscount(discountType, discountComponents)){
			return false;
		}
		
		return true;
	}
	
	public boolean validFormat(String discount) {
		final String errorMsgStart = "Error creating voucher - ";
		Pattern spendPattern = Pattern.compile("SPEND [0-9]{1,9} GET [0-9]{1,9} OFF");
		Pattern buyPattern = Pattern.compile("BUY [0-9]{1,9} GET [0-9]{1,9} FREE");
		Pattern discountPattern = Pattern.compile("[0-9]{1,3}% OFF");
		Matcher spendMatcher = spendPattern.matcher(discount);
		Matcher buyMatcher = buyPattern.matcher(discount);
		Matcher discountMatcher = discountPattern.matcher(discount);
		
		if(spendMatcher.matches()){
			return true;
		}
		else if(buyMatcher.matches()){
			return true;
		}
		else if(discountMatcher.matches()){
			return true;
		}
		
		logger.info(errorMsgStart + "Incorrect Format for discount");
		return false;
	}

	public boolean validDiscount(String discountType, String[] discountComponents){
		final String errorMsgStart = "Error creating voucher - ";
		
		switch(discountType){
		
		case "BUY" : 
			if(Integer.parseInt(discountComponents[1]) > movieRepository.findAll().size() || Integer.parseInt(discountComponents[1]) < 1){
				logger.info(errorMsgStart + "Buy X Get Y Free, X is greater than total movies stored or less than 1");
				return false;
			}
			else if(Integer.parseInt(discountComponents[3]) > movieRepository.findAll().size() || Integer.parseInt(discountComponents[3]) < 1){
				logger.info(errorMsgStart + "Buy X Get Y Free, Y is greater than total movies stored or less than 1");
				return false;
			}
			break;
		case "SPEND" :
			if(Integer.parseInt(discountComponents[1]) < 1){
				logger.info(errorMsgStart + "Spend X Get Y Off, X is less than 1");
				return false;
			}
			else if(Integer.parseInt(discountComponents[1]) <= Integer.parseInt(discountComponents[3])){
				logger.info(errorMsgStart + "Spend X Get Y Off, X is less than or equal to Y");
				return false;
			}
			else if(Integer.parseInt(discountComponents[3]) < 1){
				logger.info(errorMsgStart + "Spend X Get Y Off, Y is less than 1");
				return false;
			}
			break;
		case "DISCOUNT" :
			if(Integer.parseInt(discountComponents[0].split("%")[0]) < 1 || Integer.parseInt(discountComponents[0].split("%")[0]) > 100){
				logger.info(errorMsgStart + "X Off, X is less than 1% or greater than 100%");
				return false;
			}
			break;
	}
		return true;
	}
	
	public void checkForExpiredGlobal() {
		try{
			Voucher global = voucherRepository.findByGlobalTrue().get(0);
			Date currentDate = new Date();
		
			if(global.getExpire().getTime() < currentDate.getTime())
			{
				voucherRepository.setAllGlobalFalse();
			}
		
		}
		catch(IndexOutOfBoundsException ex)
		{
			logger.info("No global");
		}
	
	}
}
