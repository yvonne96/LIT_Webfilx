package com.instil.webflix.voucher.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.GET;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.voucher.model.Voucher;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.service.AccountService;
import com.instil.webflix.basket.data.BasketVoucherRepository;


@RestController
@RequestMapping("/voucher")
public class VoucherRestController {
	@Autowired
	private VoucherRepository repository;
	
	@Autowired
	private AccountService accountService;	
	
	@Autowired
	private BasketVoucherRepository basketVoucherRepository;
	
	
	
	@RequestMapping(method = GET, value="/{name}", produces = "application/json")
	public Voucher voucherByName(@PathVariable("name") String name) {
		return repository.findByName(name);
	}
	
	@RequestMapping(method = GET, produces = "application/json")
	public List<Voucher> allVouchers() {
		return repository.findAll();
	}
	
	@RequestMapping(method = GET, value="/global", produces = "application/json")
	public List<Voucher> allGlobalVouchers() {
		return repository.findByGlobalTrue();
	}
	
	@RequestMapping(method = GET, value="/usedVouchers", produces = "application/json")
	public List<Integer> allUsedVouchers() {
		Account current = accountService.getCurrent();
		return basketVoucherRepository.getUsedVouchers(current.getId());
	}
}