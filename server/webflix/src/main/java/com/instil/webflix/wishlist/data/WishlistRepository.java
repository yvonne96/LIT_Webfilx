package com.instil.webflix.wishlist.data;

import org.springframework.data.jpa.repository.JpaRepository;
import com.instil.webflix.movies.model.Wishlist;
import com.instil.webflix.security.model.Account;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
	public Wishlist findByAccount(Account account);
}
