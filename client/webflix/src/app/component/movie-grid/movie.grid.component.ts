import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';

@Component({
  moduleId: module.id,
  selector: '[movie-grid]',
  templateUrl: 'movie.grid.component.html',
  styleUrls: ['movie.grid.component.css']
})
export class MovieGridComponent {
  desc: string = '';
  descLen: number = 100;
  @Input('currentMovie')
  theMovie: any;
  @Input('showAddToBasket')
  showAddToBasket: boolean;
  @Input('showPrice')
  showPrice: boolean;
  @Output()
  onAddMovieToBasket = new EventEmitter<Movie>();
  info: string = '';

  addMovieToBasket(): void {

    this.showAddToBasket = true;
    this.showPrice = true;
    this.onAddMovieToBasket.emit(this.theMovie);
  }

  showDescription() {
    this.desc = this.theMovie.description.slice(0, this.descLen);
  }

  hideDescription() {
    this.desc = '';
  }

  showInfo() {
    this.info = 'Genre: ' + this.theMovie.genre.value
      + ', Classification: ' + this.theMovie.classification.value
      + ', Year: ' + this.theMovie.year;
  }

  hideInfo() {
    this.info = '';
  }
}
