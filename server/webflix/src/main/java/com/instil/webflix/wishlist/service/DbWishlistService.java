package com.instil.webflix.wishlist.service;

import com.instil.webflix.wishlist.data.WishlistItemRepository;
import com.instil.webflix.wishlist.data.WishlistRepository;
import com.instil.webflix.wishlist.model.WishlistSummary;
import com.instil.webflix.movies.model.Wishlist;
import com.instil.webflix.movies.model.WishlistItem;
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
public class DbWishlistService implements WishlistService {
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	private WishlistRepository wishlistRepository;

	@Autowired
	private WishlistItemRepository wishlistItemRepository;

	@Autowired
	private AccountRepository accountRepository;

	public int getItemCount(Account account) {
		System.out.println(account);
		Wishlist wishlist = getWishlistForAccount(account);
		
		return wishlist.getItems().size();
	}

	public void addMovieToWishlist(Account account, Movie movie) {
		Wishlist wishlist = getWishlistForAccount(account);
		wishlist.getItems().add(new WishlistItem(wishlist, movie));
		wishlistRepository.save(wishlist);
	}

	@Override
	public void clearWishlist(Account account) {
		Wishlist wishlist = getWishlistForAccount(account);
		wishlistRepository.delete(wishlist);
	}

	@Override
	public WishlistSummary getSummary(Account account) {
		Wishlist wishlist = getWishlistForAccount(account);
		Collection<Movie> moviesForBasket = getMoviesForWishlist(wishlist);
		return new WishlistSummary(moviesForBasket, getTotalCostForMovies(moviesForBasket));
	}

	@Override
	public void clearMovie(Account account, Long movieId) {
		Wishlist wishlist = getWishlistForAccount(account);
		wishlist.getItems().stream()
				.filter(x -> x.getMovie().getId() == movieId)
				.findFirst()
				.ifPresent(x ->  {
					logger.info("Deleting wishlist item " + x.getId());
					x.setWishlist(null);
					wishlistItemRepository.delete(x);
				});
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
	

	private Collection<Movie> getMoviesForWishlist(Wishlist wishlist) {
		return wishlist.getItems().stream()
				.map(WishlistItem::getMovie)
				.collect(toList());
	}
	
	private Wishlist getWishlistForAccount(Account account) {
		Wishlist wishlist = wishlistRepository.findByAccount(account);
		if (!(wishlist == null)) {
			return wishlist;
		}
		else
		{
			logger.info("Could not find wishlist for account: " + account.getEmailAddress());
			return new Wishlist(account);
		}
	}
}