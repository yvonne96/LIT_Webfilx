package com.instil.webflix.security.service;

import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class SecurityContextAccountService implements AccountService {
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private AccountRepository accountRepository;
	
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
}