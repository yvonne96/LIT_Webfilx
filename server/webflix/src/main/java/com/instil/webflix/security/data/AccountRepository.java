package com.instil.webflix.security.data;

import java.util.Optional;

import com.instil.webflix.security.model.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {

	public Optional<Account> findByEmailAddress(String email);

}
