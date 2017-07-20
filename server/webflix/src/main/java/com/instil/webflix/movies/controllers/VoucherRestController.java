package com.instil.webflix.movies.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.DELETE;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
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
import com.instil.webflix.basket.data.VoucherRepository;
import com.instil.webflix.movies.model.Genre;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.basket.model.Voucher;
import com.instil.webflix.movies.model.MovieList;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.service.AccountService;

@RestController
@RequestMapping("/voucher")
public class VoucherRestController {
	@Autowired
	private VoucherRepository repository;
	
	@RequestMapping(method = GET, value="/{name}", produces = "application/json")
	public Voucher voucherByName(@PathVariable("name") String name) {
		return repository.findByName(name);
	}
	
	@RequestMapping(method = GET, produces = "application/json")
	public List<Voucher> allVouchers() {
		return repository.findAll();
	}
	
}