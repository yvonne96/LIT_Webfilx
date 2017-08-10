package com.instil.webflix.movies.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class WishlistItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne()
	@JoinColumn(name="wishlist_id")
	private Wishlist wishlist;

	@ManyToOne()
	@JoinColumn(name="movie_id")
	private Movie movie;

	public WishlistItem() {}

	public WishlistItem(Wishlist wishlist, Movie movie) {
		this.wishlist = wishlist;
		this.movie = movie;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Wishlist getWishlist() {
		return wishlist;
	}

	public void setWishlist(Wishlist wishlist) {
		this.wishlist = wishlist;
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

		WishlistItem that = (WishlistItem) o;

		if (id != null ? !id.equals(that.id) : that.id != null) return false;
		if (wishlist != null ? !wishlist.equals(that.wishlist) : that.wishlist != null) return false;
		return movie != null ? movie.equals(that.movie) : that.movie == null;

	}

	@Override
	public int hashCode() {
		int result = id != null ? id.hashCode() : 0;
		result = 31 * result + (wishlist != null ? wishlist.hashCode() : 0);
		result = 31 * result + (movie != null ? movie.hashCode() : 0);
		return result;
	}
}