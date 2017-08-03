package com.instil.webflix.movies.data;

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
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "INSERT INTO movie (title, year,genre, classification, director, cast, description) VALUES (:title , :year , :genre, :classification, :director, :cast, :description)")
	void addMovie(@Param("title") String title, @Param("year") String year, @Param("genre") Integer genre, @Param("classification") Integer classification, @Param("director") String director, @Param("cast") String cast,@Param("description") String description);
	
}
