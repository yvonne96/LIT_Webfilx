package com.instil.webflix.review.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reviews")
public class Review {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public int review_id;
	public int account_id;
	public int movie_id;
	public String comments;
	public double score;
	
	public Review() {}
	
	public Review(int review_id, int accountID, int movieID, String comments, double score) {
		super();
		this.review_id = review_id;
		this.account_id = accountID;
		this.movie_id = movieID;
		this.comments = comments;
		this.score = score;
	}

	public int getReviewID() {
		return review_id;
	}

	public void setReviewID(int review_Id) {
		this.review_id = review_Id;
	}

	public int getAccountID() {
		return account_id;
	}

	public void setAccountID(int account_Id) {
		this.account_id = account_Id;
	}

	public int getMovieID() {
		return movie_id;
	}

	public void setMovieID(int movie_Id) {
		this.movie_id = movie_Id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public double getScore() {
		return score;
	}

	public void setScore(double score) {
		this.score = score;
	}
	
	
}
