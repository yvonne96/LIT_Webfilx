package com.instil.webflix.basket.service;

import com.instil.webflix.basket.data.BasketItemRepository;
import com.instil.webflix.basket.data.BasketRepository;
import com.instil.webflix.basket.model.BasketSummary;
import com.instil.webflix.movies.model.Basket;
import com.instil.webflix.movies.model.BasketItem;
import com.instil.webflix.movies.model.Movie;
import com.instil.webflix.security.data.AccountRepository;
import com.instil.webflix.security.model.Account;

import java.util.Collection;
import static java.util.stream.Collectors.*;

import java.math.BigDecimal;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DbBasketService implements BasketService {
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private BasketRepository basketRepository;

	@Autowired
	private BasketItemRepository basketItemRepository;

	@Autowired
	private AccountRepository accountRepository;

	public int getItemCount(Account account) {
		Basket basket = getBasketForAccount(account);
		return basket.getItems().size();
	}

	public void addMovieToBasket(Account account, Movie movie) {
		Basket basket = getBasketForAccount(account);
		basket.getItems().add(new BasketItem(basket, movie));
		basketRepository.save(basket);
	}

	@Override
	public void clearBasket(Account account) {
		Basket basket = getBasketForAccount(account);
		basketRepository.delete(basket);
	}

	@Override
	public BasketSummary getSummary(Account account) {
		Basket basket = getBasketForAccount(account);
		Collection<Movie> moviesForBasket = getMoviesForBasket(basket);
		return new BasketSummary(moviesForBasket, getTotalCostForMovies(moviesForBasket));
	}

	@Override
	public void clearMovie(Account account, Long movieId) {
		Basket basket = getBasketForAccount(account);
		basket.getItems().stream()
				.filter(x -> x.getMovie().getId() == movieId)
				.findFirst()
				.ifPresent(x ->  {
					logger.info("Deleting basket item " + x.getId());
					x.setBasket(null);
					basketItemRepository.delete(x);
				});
	}

	@Override
	public void checkout(Account account) {
		Basket basket = getBasketForAccount(account);
		account.getMyMovies().addAll(
				basket.getItems().stream()
					.map(BasketItem::getMovie)
					.collect(toList()));

		accountRepository.save(account);
		basketRepository.delete(basket);
	}

	private BigDecimal getTotalCostForMovies(Collection<Movie> movies) {
		// TODO: Don't check in code like this, go back later and implement
		BigDecimal total = new BigDecimal(0);
		for(Movie m : movies)
		{
			total = total.add(m.getPrice());
		}
		return total;
	}
	

	private Collection<Movie> getMoviesForBasket(Basket basket) {
		return basket.getItems().stream()
				.map(BasketItem::getMovie)
				.collect(toList());
	}
	
	private Basket getBasketForAccount(Account account) {
		Basket basket = basketRepository.findByAccount(account);
		if (basket == null) {
			logger.info("Could not find basket for account: " + account.getEmailAddress());
			return new Basket(account);
		}
		return basket;
	}
}
