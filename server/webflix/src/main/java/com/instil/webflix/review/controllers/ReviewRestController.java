package com.instil.webflix.review.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.instil.webflix.review.data.ReviewRepository;
import static org.springframework.web.bind.annotation.RequestMethod.*;
import com.instil.webflix.review.model.Review;

@RestController
@RequestMapping("/review")
public class ReviewRestController {
	private final Log logger = LogFactory.getLog(this.getClass());
	
	@Autowired
	ReviewRepository repository;
	
	@RequestMapping(method = POST, value="/add/{accountID}/{movieID}/{comments}/{score}/",  produces = "application/json")
	public void createReview(@PathVariable("accountID") int accountID, @PathVariable("movieID") int movieID, @PathVariable("comments") String comments, @PathVariable("score") double score){
		repository.addReview(accountID, movieID, comments.replace("%20", " "), score);
	}
	
	@RequestMapping(method = POST, value="/update/{accountID}/{movieID}/{comments}/{score}/", produces = "application/json")
	public void updateReview(@PathVariable("accountID") int accountID, @PathVariable("movieID") int movieID, @PathVariable("comments") String comments, @PathVariable("score") double score) {
		repository.updateReview(accountID, movieID, comments.replace("%20", " "), score);
	}
	
	@RequestMapping(method = GET, value="/{movieID}", produces = "application/json")
	public List<Review> findReviewsByMovieID(@PathVariable("movieID") int movieID) {
		return repository.findByMovieID(movieID);
	}
	
	@RequestMapping(method = GET, value="/reviewAverageScore/{movieID}", produces = "application/json")
	public double findAverageReviewScoreByID(@PathVariable("movieID") int movieID){
		return repository.findAverageScoreByID(movieID);
	}
	
	@RequestMapping(method = DELETE, value="/deleteReview/{reviewID}", produces = "application/json")
	public void deleteReviewByID(@PathVariable("reviewID") int reviewID) {
		repository.deleteReviewByID(reviewID);
	}
}
