package com.instil.webflix.security.service;

import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.model.LoginResponse;

import java.util.stream.Collectors;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SecurityContextAccountService implements AccountService {
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private AccountRepository accountRepository;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private TokenUtil tokenUtil;

	@Autowired
	private Roles roles;
	
	public Account getCurrent() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (!(authentication instanceof AnonymousAuthenticationToken)) {
			String email = authentication.getName();
			logger.info("Finding account of current user: " + email);
		    return accountRepository.findByEmailAddress(email)
		    		.orElseThrow(() -> new UsernameNotFoundException("Could not find the user '" + email + "'"));
		}

		logger.info("Annoymous request for current user");
		throw new BadCredentialsException("Annoymous user access not permitted");
	}
	
	public ResponseEntity<LoginResponse> login(String email, String password) {
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
	
	public ResponseEntity<Object> register(Account newAccount) {
		if (newAccount == null) {
			logger.info("Invalid registration");
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}
		if(newAccount.passwordRestrictions()){
			logger.info("Registering new user '" + newAccount.getEmailAddress());
			newAccount.setPassword(passwordEncoder.encode(newAccount.getPassword()));
			newAccount.getRoles().add(roles.getUserRole());
			accountRepository.save(newAccount);
			return ResponseEntity.ok().build();
		}
		else{
			logger.info("Invalid password");
			return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
		}

	}
}