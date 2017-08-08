package com.instil.webflix.wishlist.model;

import java.math.BigDecimal;

import com.instil.webflix.movies.model.Movie;

public class WishlistSummary {
	private Iterable<Movie> movies;
	private BigDecimal total;

	public WishlistSummary(Iterable<Movie> movies, BigDecimal total) {
		this.movies = movies;
		this.total = total;
	}

	public Iterable<Movie> getMovies() {
		return movies;
	}
	
	public BigDecimal getTotal() {
		return total;
	}
}