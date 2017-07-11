import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';

@Component({
  moduleId: module.id,
  selector: '[movie-table-row]',
  templateUrl: 'movie.table.row.component.html',
  styleUrls: ['movie.table.row.component.css']
})
export class MovieTableRowComponent {
  @Input('currentMovie')
  theMovie: any;
  @Input('showAddToBasket')
  showAddToBasket: boolean;
  @Input('showPrice')
  showPrice: boolean;
  @Output()
  onAddMovieToBasket = new EventEmitter<Movie>();
  public summary: BasketSummary;

  constructor(private basketService: BasketService) {
    this.summary = BasketSummary.empty();
    this.readBasketForUser();
    this.basketService.getBasketSummary().subscribe(
      summary => this.summary = summary
    );
  }

  addMovieToBasket(): void {
    if (this.checkForDuplicates()) {
      alert('Already in basket');
    } else {
      this.showAddToBasket = true;
      this.showPrice = true;
      this.onAddMovieToBasket.emit(this.theMovie);
    }
  }
  private readBasketForUser() {
    this.basketService.getBasketSummary()
      .subscribe(
        summary => this.summary = summary);
  }
  checkForDuplicates(): boolean {
    let movies: Movie[] = this.summary.movies;
      for (let n = 0; n < movies.length; n++) {
        if (this.theMovie.id === movies[n].id) {
          return true;
        }
      }
      this.summary.movies.push(this.theMovie);
      return false;
  }
}

