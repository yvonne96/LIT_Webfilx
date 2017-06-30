package com.instil.webflix.basket.service;

import com.instil.webflix.basket.model.BasketSummary;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.model.Account;

public interface BasketService {
	int getItemCount(Account account);

	void addMovieToBasket(Account account, Movie movie);

	void clearBasket(Account account);

	BasketSummary getSummary(Account account);

    void clearMovie(Account account, Long movieId);

    void checkout(Account account);
}
