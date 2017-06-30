package com.instil.webflix.movies.data;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import com.instil.webflix.movies.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
	@Query(value = "SELECT m FROM Movie m WHERE m.genre.value = ?1")
	List<Movie> findByGenre(String genreValue);
	
	List<Movie> findByTitleContains(String titleString);

	List<Movie> findByTitleContainsAllIgnoreCase(String titleString);
}
