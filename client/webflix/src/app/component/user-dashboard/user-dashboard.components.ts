import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Movie} from '../../model/movie';
import {Observable} from 'rxjs/Observable';
import {BasketSummary} from '../../model/basket-summary';
import {MovieService} from '../../service/movie/movie.service';
import {BasketService} from '../../service/basket/basket.service';

@Component({
  moduleId: module.id,
  selector: 'user-dashboard',
  styleUrls: ['user-dashboard.component.css'],
  templateUrl: 'user-dashboard.component.html',
})
export class UserDashboardComponent {
  isAdmin: boolean;
  public purchasableMovies: Movie[];
  public basketMovies: Movie[];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private movieService: MovieService,
              private basketService: BasketService) {
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
    this.extractPurchasableMovies(this.movieService.fetchPurchasableMovies());
    this.extractBasketMovies(this.basketService.getBasketSummary());
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  extractPurchasableMovies(source: Observable<Movie[]>) {
    source
      .subscribe(movies => {
        this.purchasableMovies = movies;
      }, error => ('Could not pull purchasable movies'));
  }

  extractBasketMovies(source: Observable<BasketSummary>) {
    source
      .subscribe(summary => {
        this.basketMovies = summary.movies;
      }, error => ('Error reading basket movies'));
  }

}
