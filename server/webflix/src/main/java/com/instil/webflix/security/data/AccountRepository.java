package com.instil.webflix.security.data;

import java.util.Optional;

import com.instil.webflix.security.model.Account;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface AccountRepository extends CrudRepository<Account, Long> {

	public Optional<Account> findByEmailAddress(String email);
	
	@Query(nativeQuery= true, value = "SELECT * FROM ACCOUNT WHERE id = :id")
	Account findByID(@Param("id") int accountID);
}
