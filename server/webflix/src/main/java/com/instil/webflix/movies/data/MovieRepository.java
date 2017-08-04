package com.instil.webflix.movies.data;

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
	@Query(nativeQuery = true, value = "UPDATE movie SET title = :title, year = :year, genre = :genre, classification = :classification, director = :director, main_cast = :mainCast, description = :description  WHERE id = :id")
	void editMovie(@Param("id") int id,@Param("title") String title, @Param("year") String year, @Param("genre") Integer genre, @Param("classification") Integer classification, @Param("director") String director, @Param("mainCast") String mainCast, @Param("description") String description);
	
}
