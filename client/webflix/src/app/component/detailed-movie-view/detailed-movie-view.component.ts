import {Component} from '@angular/core';
import {Movie} from '../../model/movie';
import {ActivatedRoute, Params} from '@angular/router';
import {MovieService} from '../../service/movie/movie.service';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {ReviewService} from '../../service/review/review.service';
import {ApiClient} from '../../service/api-client/api-client.service';
import {Review} from '../../model/review';
import {WishlistService} from '../../service/wishlist/wishlist.service';
import {WishlistSummary} from '../../model/wishlist-summary';

@Component({
  moduleId: module.id,
  selector: 'detailed-movie-view',
  templateUrl: 'detailed-movie-view.component.html',
  styleUrls: ['detailed-movie-view.component.css'],
})

export class DetailedMovieViewComponent {
  public theMovie: Movie;
  public theMovieID: number;
  public owned: boolean;
  public inBasket: boolean;
  public inWishlist: boolean;
  public summary: BasketSummary;
  public myMovies: Movie[];
  public wishlist: WishlistSummary;
  public score: number;
  public comments: string;
  public currentUserID: number;
  public reviews: Review[];
  public avgReviewScore: number;
  public reviewErrorMsg: String = null;
  public hasReview: boolean = false;
  private favorite: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MovieService,
              private basketService: BasketService,
              private location: Location,
              private reviewService: ReviewService,
              private apiClient: ApiClient,
              private wishlistService: WishlistService) {
    this.summary = BasketSummary.empty();
    this.pullIdFromParams();
    this.retrieveMovieData(this.movieService.fetchById(Number(this.theMovieID)));
    this.retrieveAvgReviewScore(this.reviewService.getAvgScoreByID(Number(this.theMovieID)));
    this.readBasketForUser();
    this.readMyMoviesForUser();
    this.readWishlistForUser();
    this.retrieveCurrentAccountID(this.apiClient.getCurrentAccountID());
    this.retrieveReviewsForMovie(this.reviewService.getReviewsByMovieID(this.theMovieID));
  }

  retrieveMovieData(source: Observable<Movie>) {
    source
      .subscribe(movie => {
        this.theMovie = movie;
      }, error => ('Error pulling the requested movie'));
  }

  pullIdFromParams() {
    this.activatedRoute.queryParams
      .subscribe((params: Params) => {
        this.theMovieID = params['id'];
      });
  }

  backClick() {
    this.location.back();
  }

  addMovieToBasket() {
    if (!this.checkForBasketDuplicates()) {
      this.basketService.addToBasket(this.theMovie)
        .subscribe();
      this.inBasket = true;
    }
  }

  addMovieToWishlist() {
    this.wishlistService.addToWishlist(this.theMovie)
      .subscribe();
    this.inWishlist = true;
  }

  readBasketForUser() {
    this.basketService.getBasketSummary()
      .subscribe(summary => {
        this.summary = summary;
        if (this.checkForBasketDuplicates()) {
          this.inBasket = true;
        }
      }, error => ('Error pulling the basket summary'));
  }

  readMyMoviesForUser() {
    this.movieService.fetchMyMovies()
      .subscribe(myMovies => {
        this.myMovies = myMovies;
        if (this.checkForMovieDuplicates()) {
          this.owned = true;
        }
      }, error => ('Error pulling user movies'));
  }

  readWishlistForUser() {
    this.wishlistService.getWishlistSummary()
      .subscribe(wishlist => {
       this.wishlist = wishlist;
       if (this.checkForWishlistDuplicates()) {
         this.inWishlist = true;
       }
    }, error => ('Error pulling user wishlist'));
  }

  checkForMovieDuplicates(): boolean {
    let checkMovies: Movie[] = this.myMovies;
    for (let m = 0; m < checkMovies.length; m++) {
      if (Number(this.theMovieID) === checkMovies[m].id) {
        return true;
      }
    }
    return false;
  }

  checkForBasketDuplicates(): boolean {
    let basketMovies: Movie[] = this.summary.movies;
    for (let n = 0; n < basketMovies.length; n++) {
      if (Number(this.theMovieID) === basketMovies[n].id) {
        return true;
      }
    }
    return false;
  }

  checkForWishlistDuplicates() {
    let wishlistMovies: Movie[] = this.wishlist.movies;
    for (let n = 0; n < wishlistMovies.length; n++) {
      if (this.theMovie.id === wishlistMovies[n].id) {
        return true;
      }
    }
    return false;
  }

  checkIfUserHasReview() {
    for (let n = 0; n < this.reviews.length; n++) {
      if (this.reviews[n].account_id === this.currentUserID) {
        this.hasReview = true;
      }
    }
  }

  createReview() {
    if (this.score == null ) {
      this.reviewErrorMsg = 'Invalid Score submitted';
    } else if (this.comments == null ) {
      this.reviewErrorMsg = 'Invalid comments submitted';
    } else if (this.hasReview) {
      if (confirm('You have already written a review for this movie, do you want to overwrite your review with this one?')) {
        this.reviewService.updateReview(this.currentUserID, this.theMovieID, this.comments, this.score)
          .subscribe(() => {
            this.reviewErrorMsg = null;
            this.refreshReviewForm();
            this.refreshReviews();
            this.refreshAvgScore();
          }, error => ('Unable to update Review'));
      }
    } else {
      this.reviewService.createReview(this.currentUserID, this.theMovieID, this.comments, this.score)
        .subscribe(() => {
          this.reviewErrorMsg = null;
          this.refreshReviewForm();
          this.refreshReviews();
          this.refreshAvgScore();
        }, error => ('Unable to create Review'));
    }
  }

  retrieveReviewsForMovie(source: Observable<Review[]>) {
    source
      .subscribe(reviews => {
        this.reviews = reviews;
        this.checkIfUserHasReview();
      }, error => ('Error retrieving reviews for movie'));
  }

  retrieveAvgReviewScore(source: Observable<number>) {
    source
      .subscribe(avgScore => {
        this.avgReviewScore = avgScore;
      }, error => ('Error retrieving average review score for movie'));
  }

  refreshReviews() {
    this.reviewService.getReviewsByMovieID(this.theMovieID)
      .subscribe(reviews => {
        this.reviews = reviews;
        this.checkIfUserHasReview();
      });
  }

  refreshAvgScore() {
    this.reviewService.getAvgScoreByID(this.theMovieID)
      .subscribe(avgScore => {
        this.avgReviewScore = avgScore;
      });
  }

  refreshReviewForm() {
    let form = <HTMLFormElement>document.getElementById('createReview');
    form.reset();
  }

  retrieveCurrentAccountID(source: Observable<number>) {
    source
      .subscribe(id => {
        this.currentUserID = id;
      }, error => ('Unable to retrieve current user ID'));
  }

  userReviewDeleted() {
    this.hasReview = false;
    this.refreshReviews();
  }

  toggleFavorite(movie: Movie) {
      this.favorite = true;
      this.movieService.toggleFavorite(movie.id, this.favorite)
        .subscribe(() => {
        });
    }
}
