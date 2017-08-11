import { Component, Input} from '@angular/core';
import {Movie} from '../../model/movie';
import {MovieService} from '../../service/movie/movie.service';
import {BasketService} from '../../service/basket/basket.service';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'm-grid',
  templateUrl: 'grid.component.html',
  styleUrls: ['grid.component.css']
})
export class GridComponent {
  @Input('movies')
  movies: Movie[];

  @Input('showAddToBasket')
  showAddToBasket: boolean;

  @Input('showPrice')
  showPrice: boolean;

  constructor(private basket: BasketService) {
    this.showAddToBasket = true;
    this.showPrice = true;
  }

  movieAdded(movie: Movie) {
    this.basket.addToBasket(movie).subscribe();
  }
}
