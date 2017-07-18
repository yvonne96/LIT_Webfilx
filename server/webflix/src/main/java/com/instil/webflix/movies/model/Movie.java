package com.instil.webflix.movies.model;

import java.math.BigDecimal;

import javax.persistence.*;

@Entity
@Table(name="movie")
@SecondaryTable(name="movie_price", pkJoinColumns = @PrimaryKeyJoinColumn(name = "movie_id"))
public class Movie {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String title;
	private String year;
	private String description;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "genre")
	private Genre genre;

	@ManyToOne(cascade = CascadeType.PERSIST)
	@JoinColumn(name = "classification")
	private Classification classification;

	@Column(table = "movie_price", name = "price")
	private BigDecimal price;

	public Movie() {
		super();
		this.title = "";
		this.year = "";
		this.price = new BigDecimal(0);
		this.description = "";
	}

	public Movie(String title) {
		this();
		this.title = title;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Genre getGenre() {
		return genre;
	}

	public void setGenre(Genre genre) {
		this.genre = genre;
	}

	public Classification getClassification() {
		return classification;
	}

	public void setClassification(Classification classification) {
		this.classification = classification;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Movie other = (Movie) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		return true;
	}
	
	
}
