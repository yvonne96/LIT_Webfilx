import {Component, Input, OnInit, Output} from '@angular/core';
import {Movie} from '../../../model/movie';
import {MovieService} from '../../../service/movie/movie.service';
import {ActivatedRoute, Router, Route } from '@angular/router';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {ReviewService} from '../../../service/review/review.service';

@Component({
  moduleId: module.id,
  selector: '[manage-movies-row]',
  templateUrl: 'manage-movies-row.component.html',
  styleUrls: ['manage-movies.component.css'],
})

export class ManageMoviesRowComponent implements OnInit{
  desc: string = '';
  descLen: number = 100;
  @Input('currentMovie')
  theMovie: any;
  @Input('showAddToBasket')
  showAddToBasket: boolean;
  @Input('showPrice')
  showPrice: boolean;
  public avgReviewScore: number;

  constructor(private router: Router,
              private movieService: MovieService,
              private route: ActivatedRoute,
              private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.getAvgScore();
  }

  addMovie(aMovie: Movie) {
    this.theMovie = aMovie;
  }

  showDescription() {
    this.desc = this.theMovie.description.slice(0, this.descLen);
    this.desc += '...';
  }

  hideDescription() {
    this.desc = '';
  }
  togglePurchasableMovie(movie: Movie){
    this.movieService.togglePurchasableMovie(movie)
      .subscribe();
  }

  getAvgScore() {
    this.reviewService.getAvgScoreByID(this.theMovie.id)
      .subscribe(avg => {
        this.avgReviewScore = avg;
      }, error => ('Error getting the average review score'));
  }
}
