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
	public String title;
	private String year;
	private String description;
	private String director;
	private String main_cast;
	private String image;

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
		this.director="";
		this.main_cast="";
		this.image="";
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
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getCast() {
		return main_cast;
	}
	
	public void setCast(String mainCast) {
		this.main_cast = mainCast;
	}
	
	public String getDirector() {
		return director;
	}
	
	public void setDirector(String director) {
		this.director = director;
	}
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
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
