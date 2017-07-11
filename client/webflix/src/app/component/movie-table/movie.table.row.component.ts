import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';
import {BasketService} from '../../service/basket/basket.service';
import {BasketSummary} from '../../model/basket-summary';
import {MovieService} from '../../service/movie/movie.service';

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
  public myMovies: Movie[];

  constructor(private basketService: BasketService, private movieService: MovieService) {
    this.summary = BasketSummary.empty();
    this.readBasketForUser();
    this.readMyMoviesForUser();
    this.basketService.getBasketSummary().subscribe(
      summary => this.summary = summary
    );
    this.movieService.fetchMyMovies().subscribe(
      myMovies => this.myMovies = myMovies );
  }

  addMovieToBasket(): void {
    if (this.checkForMovieDuplicates()) {
      alert('Already bought!!');
    } else if (this.checkForBasketDuplicates() {
      alert('Already in basket!!');
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
  private readMyMoviesForUser() {
    this.movieService.fetchMyMovies()
      .subscribe(
        myMovies => this.myMovies = myMovies );
  }
  checkForMovieDuplicates(): boolean {
    let checkMovies: Movie[] = this.myMovies;
      for (let m = 0; m < checkMovies.length; m++) {
        if (this.theMovie.id === checkMovies[m].id){
          return true;
        }
      }
      return false;
  }
  checkForBasketDuplicates(): boolean {
    let basketMovies: Movie[] = this.summary.movies;
    for (let n = 0; n < basketMovies.length; n++) {
      if (this.theMovie.id === basketMovies[n].id) {
        return true;
      }
    }
    this.summary.movies.push(this.theMovie);
    return false;
  }
}

