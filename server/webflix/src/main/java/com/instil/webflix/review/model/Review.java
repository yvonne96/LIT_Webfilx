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
	public int review_Id;
	public int account_Id;
	public int movie_Id;
	public String comments;
	public float score;
	
	public Review() {}
	
	public Review(int review_Id, int account_Id, int movie_Id, String comments, float score) {
		super();
		this.review_Id = review_Id;
		this.account_Id = account_Id;
		this.movie_Id = movie_Id;
		this.comments = comments;
		this.score = score;
	}

	public int getReviewID() {
		return review_Id;
	}

	public void setReviewID(int review_Id) {
		this.review_Id = review_Id;
	}

	public int getAccountID() {
		return account_Id;
	}

	public void setAccountID(int account_Id) {
		this.account_Id = account_Id;
	}

	public int getMovieID() {
		return movie_Id;
	}

	public void setMovieID(int movie_Id) {
		this.movie_Id = movie_Id;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public float getScore() {
		return score;
	}

	public void setScore(float score) {
		this.score = score;
	}
	
	
}
