package com.instil.webflix.security.controllers;

import com.instil.webflix.security.model.LoginResponse;
import com.instil.webflix.security.model.Role;
import com.instil.webflix.security.service.Roles;
import com.instil.webflix.security.service.TokenUtil;
import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.web.bind.annotation.RequestMethod.*;

import java.util.stream.Collectors;

import javax.annotation.security.RolesAllowed;

@RestController
@RequestMapping("/account")
public class AccountRestController {
	private final Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private Roles roles;

	@Autowired
	private TokenUtil tokenUtil;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AccountRepository accountRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@RolesAllowed("ADMIN")
	@RequestMapping(method = GET, value = "/all", produces = "application/json")
	public Iterable<Account> getAllAccounts() {
		return accountRepository.findAll();
	}

	@RequestMapping(method = POST, value = "/login", produces = "application/json")
	public ResponseEntity<LoginResponse> login(@RequestHeader(value = "username") String email,
                                               @RequestHeader(value = "password") String password) {
		if (email == null || password == null) {
			logger.info("Invalid login request");
			return new ResponseEntity<LoginResponse>((LoginResponse) null, HttpStatus.BAD_REQUEST);
		}

		logger.info("Setting authentication context");
		final Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(email, password));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		logger.info("Authenticated " + email);
		UserDetails userDetails = userDetailsService.loadUserByUsername(email);
		final String token = tokenUtil.generateToken(userDetails);

		LoginResponse response = new LoginResponse(
				token, 
				userDetails
					.getAuthorities().stream()
					.map(x -> x.toString())
					.collect(Collectors.toList()));
		return ResponseEntity.ok(response);
	}

	@RequestMapping(method = POST, value = "/register", produces = "application/json")
	public ResponseEntity<Object> register(@RequestBody() Account newAccount) {
		if (newAccount == null) {
			logger.info("Invalid registration");
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}

		logger.info("Registering new user '" + newAccount.getEmailAddress());
		newAccount.setPassword(passwordEncoder.encode(newAccount.getPassword()));
		newAccount.getRoles().add(roles.getUserRole());
		accountRepository.save(newAccount);
		return ResponseEntity.ok().build();
	}
}
