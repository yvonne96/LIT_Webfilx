package com.instil.webflix.voucher.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.Date;
import java.util.List;

import javax.ws.rs.POST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.movies.data.MovieRepository;
import com.instil.webflix.voucher.data.VoucherRepository;
import com.instil.webflix.movies.model.Genre;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.voucher.model.Voucher;
import com.instil.webflix.movies.model.MovieList;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.service.AccountService;
import com.instil.webflix.voucher.service.VoucherService;

@RestController
@RequestMapping("/voucher")
public class VoucherRestController {
	@Autowired
	private VoucherRepository repository;
	
//	@Autowired
//	private VoucherService voucherService;
	
	@RequestMapping(method = GET, value="/{name}", produces = "application/json")
	public Voucher voucherByName(@PathVariable("name") String name) {
		return repository.findByName(name);
	}
	
	@RequestMapping(method = GET, produces = "application/json")
	public List<Voucher> allVouchers() {
		return repository.findAll();
	}
	
	@RequestMapping(method = DELETE, value="/{voucherID}",  produces = "application/json")
	public void removeVoucher(@PathVariable("voucherID") int ID){
		repository.deleteById(ID);
	}
	
	@RequestMapping(method = POST, value="/{voucherID}/{global}",  produces = "application/json")
	public void toggleGlobal(@PathVariable("voucherID") int ID, @PathVariable("global") boolean global){
		repository.setAllGlobalFalse();
		repository.modifyById(ID, global);
	}
	
	@RequestMapping(method = POST, value="/{code}/{discount}/{expiryDate}",  produces = "application/json")
	public void createVoucher(@PathVariable("code") String code, @PathVariable("discount") String discount, @PathVariable("expiryDate") Date expiryDate){
		repository.addVoucher(code, discount, expiryDate);
	}
	
}
