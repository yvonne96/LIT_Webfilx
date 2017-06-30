package com.instil.webflix.security.service;

import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;
import com.instil.webflix.security.model.Role;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;

@Service
public class DbUserDetailsService implements UserDetailsService {
	private final Log logger = LogFactory.getLog(this.getClass());

	@Autowired
	private AccountRepository accountRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		logger.info("Looking up user " + username);
		return accountRepository
				.findByEmailAddress(username)
				.map(a -> createUser(a))
				.orElseThrow(() -> new UsernameNotFoundException("Could not find the user '" + username + "'"));
	}

	private UserDetails createUser(Account account) {
		List<String> roleStrings = account.getRoles().stream()
				.map(Role::getName)
				.collect(toList());

		return new User(
				account.getEmailAddress(),
				account.getPassword().trim(), 
				true, true, true, true,
				AuthorityUtils.createAuthorityList(roleStrings.toArray(new String[roleStrings.size()]))	);
	}
}