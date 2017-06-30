package com.instil.webflix.basket.model;

import java.math.BigDecimal;

import com.instil.webflix.movies.model.Movie;

public class BasketSummary {
	private Iterable<Movie> movies;
	private BigDecimal total;

	public BasketSummary(Iterable<Movie> movies, BigDecimal total) {
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

