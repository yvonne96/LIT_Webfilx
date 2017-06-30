package com.instil.webflix.movies.model;

import javax.persistence.*;

@Entity
public class BasketItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne()
	@JoinColumn(name="basket_id")
	private Basket basket;

	@ManyToOne()
	@JoinColumn(name="movie_id")
	private Movie movie;

	public BasketItem() {}

	public BasketItem(Basket basket, Movie movie) {
		this.basket = basket;
		this.movie = movie;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Basket getBasket() {
		return basket;
	}

	public void setBasket(Basket basket) {
		this.basket = basket;
	}

	public Movie getMovie() {
		return movie;
	}

	public void setMovie(Movie movie) {
		this.movie = movie;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;

		BasketItem that = (BasketItem) o;

		if (id != null ? !id.equals(that.id) : that.id != null) return false;
		if (basket != null ? !basket.equals(that.basket) : that.basket != null) return false;
		return movie != null ? movie.equals(that.movie) : that.movie == null;

	}

	@Override
	public int hashCode() {
		int result = id != null ? id.hashCode() : 0;
		result = 31 * result + (basket != null ? basket.hashCode() : 0);
		result = 31 * result + (movie != null ? movie.hashCode() : 0);
		return result;
	}
}