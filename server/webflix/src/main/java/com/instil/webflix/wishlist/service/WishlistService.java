package com.instil.webflix.wishlist.service;

import com.instil.webflix.wishlist.model.WishlistSummary;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.model.Account;

public interface WishlistService {
	int getItemCount(Account account);

	void addMovieToWishlist(Account account, Movie movie);

	void clearWishlist(Account account);

	WishlistSummary getSummary(Account account);

    void clearMovie(Account account, Long movieId);

}
