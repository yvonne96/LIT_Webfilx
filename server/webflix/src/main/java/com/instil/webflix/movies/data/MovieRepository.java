package com.instil.webflix.movies.data;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import com.instil.webflix.movies.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	@Query(value = "SELECT m FROM Movie m WHERE m.genre.value = ?1")
	List<Movie> findByGenre(String genreValue);
	
	List<Movie> findByTitleContains(String titleString);

	List<Movie> findByTitleContainsAllIgnoreCase(String titleString);
	
//	@Query(value = "SELECT m FROM Movie")
//	List<Movie> getAllMovies();
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "INSERT INTO movie (title, year,genre, classification, director, main_cast, description) VALUES (:title , :year , :genre, :classification, :director, :mainCast, :description)")
	void addMovie(@Param("title") String title, @Param("year") String year, @Param("genre") Integer genre, @Param("classification") Integer classification, @Param("director") String director, @Param("mainCast") String mainCast, @Param("description") String description);
	
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "INSERT INTO movie_price (movie_id, price) VALUES (:movie_id, :price)")
	void addPrice( @Param("movie_id") Long movie_id, @Param("price") BigDecimal price);
}
