import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';

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

  addMovieToBasket(): void {
    this.showAddToBasket = true;
    this.showPrice = true;
    this.onAddMovieToBasket.emit(this.theMovie);
  }
}
