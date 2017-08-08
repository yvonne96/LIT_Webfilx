import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/movie';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MovieService} from '../../service/movie/movie.service';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';

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
  public summary: BasketSummary;
  public myMovies: Movie[];
  public reviewMenuToggled: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MovieService,
              private basketService: BasketService,
              private location: Location) {
    this.summary = BasketSummary.empty();
    this.pullIdFromParams();
    this.retrieveMovieData(this.movieService.fetchById(Number(this.theMovieID)));
    this.readBasketForUser();
    this.readMyMoviesForUser();
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

  createReview() {
    console.log('CREATE REVIEW');
  }

  toggleReviewForm() {
    this.reviewMenuToggled = (!this.reviewMenuToggled);
  }

}
