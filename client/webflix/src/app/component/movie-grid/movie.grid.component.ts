import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Movie} from '../../model/movie';
import {Http, } from '@angular/http';

import 'rxjs/add/operator/toPromise';


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
  image: string = '';
  listening: any;
  isSet: boolean = false;

  constructor(private http: Http) {
  }

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

  getImageData() {
    const data =  this.http
      .get('https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=' + this.theMovie.title)
      .subscribe(dat => {
        this.image = dat.json().results[0].poster_path;
        this.isSet = true;
      });
    if (this.image !== '') {
      data.unsubscribe();
      console.log(this.image);
      return this.image;
    }
  }

  setImageData() {
    return this.image;
  }
}
