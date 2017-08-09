package com.instil.webflix.review.controllers;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

import java.util.List;

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
	
	@Autowired
	ReviewRepository repository;
	
	@RequestMapping(method = POST, value="/{accountID}/{movieID}/{comments}/{score}",  produces = "application/json")
	public void createReview(@PathVariable("accountID") int accountID, @PathVariable("movieID") int movieID, @PathVariable("comments") String comments, @PathVariable("score") float score){
		repository.addReview(accountID, movieID, comments.replace("%20", " "), score);
	}
	
	@RequestMapping(method = GET, value="/{movieID}", produces = "application/json")
	public List<Review> findReviewsByMovieID(@PathVariable("movieID") int movieID) {
		return repository.findByMovie_Id(movieID);
	}
}
