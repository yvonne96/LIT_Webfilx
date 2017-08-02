import {Component, Input} from '@angular/core';
import 'rxjs/add/operator/map';
import {Movie} from '../../model/movie';
import {BasketService} from '../../service/basket/basket.service';
import {MovieService} from '../../service/movie/movie.service';
import {Observable} from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'movie-table',
  templateUrl: 'movie-table.component.html',
  styleUrls: ['movie-table.component.css']
})
export class MovieDisplayComponent {
  @Input('movies')
  movies: Movie;

  @Input('showAddToBasket')
  showAddToBasket: boolean;

  @Input('showPrice')
  showPrice: boolean;

  constructor(private basket: BasketService,
              private moviesService: MovieService) {
    this.showAddToBasket = true;
    this.showPrice = true;
  }

  movieAdded(movie: Movie) {
    this.basket.addToBasket(movie).subscribe();
  }

}
