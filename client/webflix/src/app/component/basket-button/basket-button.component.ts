import {AfterViewInit, Component, Input, OnChanges, OnInit} from '@angular/core';
import {BasketService} from '../../service/basket/basket.service';
import {Movie} from '../../model/movie';
import {MovieService} from '../../service/movie/movie.service';
import {Observable} from 'rxjs/Observable';
import {BasketSummary} from '../../model/basket-summary';


@Component({
  moduleId: module.id,
  selector: 'basket-button',
  templateUrl: 'basket-button.component.html'
})
export class BasketButtonComponent implements OnInit{

  @Input('basketMovies')
  public basketMovies: Movie[];

  @Input('purchasableMovies')
  public purchasableMovies: Movie[];

  public itemCount: number;

  constructor(private basketService: BasketService,
              private movieService: MovieService) {
    this.readItemCountForUser();
    this.basketService.basketCount.subscribe(
      value => this.itemCount = value
    );
  }

  ngOnInit() {
    this.checkForUnpurchasableMovies();
  }

  private readItemCountForUser() {
    this.basketService.getBasketItemCount()
      .subscribe(value => this.itemCount = value);
  }

  checkForUnpurchasableMovies() {
    console.log(this.basketMovies);
    console.log(this.purchasableMovies);
    for (let n = 0; n < this.basketMovies.length; n++) {
      if (!this.purchasableMovie(this.basketMovies[n])) {
        this.basketService.removeMovie(this.basketMovies[n])
          .subscribe(() => {
          this.refreshItemCount();
          alert('A Movie was removed from your basket because it is no longer available for purchase: ' + this.basketMovies[n].title); });
      }
    }
  }

  purchasableMovie(movie: Movie): boolean {
    for (let n = 0; n < this.purchasableMovies.length; n++) {
      if (movie.id === this.purchasableMovies[n].id) {
        return true;
      }
    }
    return false;
  }

  refreshItemCount() {
    this.basketService.basketCount
      .subscribe(value => this.itemCount = value);
  }

  // extractPurchasableMovies(source: Observable<Movie[]>) {
  //   source
  //     .subscribe(movies => {
  //       this.purchasableMovies = movies;
  //     }, error => ('Could not pull purchasable movies'));
  // }
  //
  // extractBasketMovies(source: Observable<BasketSummary>) {
  //   source
  //     .subscribe(summary => {
  //       this.basketMovies = summary.movies;
  //     }, error => ('Error reading basket movies'));
  // }
  //
  // refreshBasketAndPurchasableMovies () {
  //   this.extractPurchasableMovies(this.movieService.fetchPurchasableMovies());
  //   this.extractBasketMovies(this.basketService.getBasketSummary());
  // }

}
