package com.instil.webflix.basket.data;

import org.springframework.data.jpa.repository.JpaRepository;
import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.security.model.Account;

public interface BasketRepository extends JpaRepository<Basket, Long> {
	public Basket findByAccount(Account account);
}
