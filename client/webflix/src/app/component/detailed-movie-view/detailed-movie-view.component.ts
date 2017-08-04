import {Component, OnInit} from '@angular/core';
import {Movie} from '../../model/movie';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {MovieService} from '../../service/movie/movie.service';
import {Observable} from 'rxjs/Observable';
import {Location} from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'detailed-movie-view',
  templateUrl: 'detailed-movie-view.component.html',
  styleUrls: ['detailed-movie-view.component.css'],
})

export class DetailedMovieViewComponent{
  public theMovie: Movie;
  public theMovieID: number;

  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MovieService,
              private location: Location) {
    this.pullIdFromParams();
    this.retrieveMovieData(this.movieService.fetchById(Number(this.theMovieID)));
  }

  retrieveMovieData(source: Observable<Movie>) {
    source
      .subscribe(movie => {
        this.theMovie = movie;
        console.log(this.theMovie);
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


}
