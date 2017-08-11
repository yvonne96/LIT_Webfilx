package com.instil.webflix.security.controllers;

import com.instil.webflix.security.model.LoginResponse;
import com.instil.webflix.security.service.AccountService;
import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.*;


import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/account")
public class AccountRestController {

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private AccountService accountService;
	
	public AccountRestController(){
		
	}

	@RolesAllowed("ADMIN")
	@RequestMapping(method = GET, value = "/all", produces = "application/json")
	public Iterable<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	@RequestMapping(method = POST, value = "/login", produces = "application/json")
	public ResponseEntity<LoginResponse> login(@RequestHeader(value = "username") String email,
                                               @RequestHeader(value = "password") String password) {
		return accountService.login(email, password);
	}

	@RequestMapping(method = POST, value = "/register", produces = "application/json")
	public ResponseEntity<Object> register(@RequestBody() Account newAccount) {
		return accountService.register(newAccount);
	}
	
	@RequestMapping(method = GET, value = "/currentUserID", produces = "application/json")
	public Long getCurrentUserID() {
		return accountService.getCurrent().getId();
	}
	
	@RequestMapping(method = GET, value = "/UserByID/{accountID}", produces = "application/json")
	public Account getUserByID(@PathVariable("accountID") int accountID) {
		return accountRepository.findByID(accountID);		
	}
}
