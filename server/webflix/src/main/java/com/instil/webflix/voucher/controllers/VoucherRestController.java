package com.instil.webflix.voucher.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.movies.data.MovieRepository;
import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.movies.model.BasketVoucher;
import com.instil.webflix.movies.model.Genre;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.voucher.model.Voucher;
import com.instil.webflix.movies.model.MovieList;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.service.AccountService;
import com.instil.webflix.basket.data.BasketVoucherRepository;
import com.instil.webflix.voucher.service.VoucherService;
import com.instil.webflix.basket.data.BasketRepository;

@RestController
@RequestMapping("/voucher")
public class VoucherRestController {
	@Autowired
	private VoucherRepository repository;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private BasketRepository basketRepository;
	
	@Autowired
	private VoucherRepository voucherRepository;
	
	@Autowired
	private BasketVoucherRepository basketVoucherRepository;
	
	
	@Autowired
	private BasketVoucherRepository usedRepository;
	
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
		Basket basket = basketRepository.findByAccount(current);
		return basketVoucherRepository.getUsedVouchers(current.getId());
	}
	
	@RequestMapping(method = POST, value = "/usedVouchers/{voucherId}",  produces = "application/json")
    public void addUsedVouchers(@PathVariable("voucherId") Long voucherId) {
        Account current = accountService.getCurrent();
        Basket basket = basketRepository.findByAccount(current);
        Long basket_id = basket.getId();
        Voucher voucher = voucherRepository.findById(voucherId);
        basketVoucherRepository.addUsedVouchers(current.getId(), voucher.getId());
    }
	
	
	
}