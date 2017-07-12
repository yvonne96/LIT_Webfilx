package com.instil.webflix.security.service;

import org.springframework.http.ResponseEntity;

import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.model.LoginResponse;

public interface AccountService {
	Account getCurrent();
	
	ResponseEntity<LoginResponse> login(String email, String pw);
	
	ResponseEntity<Object> register(Account newAccount);
}
