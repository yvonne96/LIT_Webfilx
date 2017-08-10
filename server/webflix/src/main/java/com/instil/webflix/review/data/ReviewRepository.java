package com.instil.webflix.review.data;

import com.instil.webflix.review.model.Review;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long>{
	
	@Query(nativeQuery = true, value = "SELECT * FROM reviews WHERE movie_id = :movie_id")
	List<Review> findByMovieID(@Param("movie_id") int movieID);
	
	@Query(nativeQuery = true, value = "SELECT AVG(score) FROM reviews WHERE movie_id = :movie_id")
	int findAverageScoreByID(@Param("movie_id") int movieID);
	
	@Transactional
	@Modifying
	@Query(nativeQuery = true, value = "INSERT INTO reviews (account_id, movie_id, comments, score) VALUES (:accountID, :movieID, :comments, :score)")
	void addReview(@Param("accountID") int accountID, @Param("movieID") int movieID, @Param("comments") String comments, @Param("score") float score);

}
