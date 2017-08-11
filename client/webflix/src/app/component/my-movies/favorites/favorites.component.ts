import {Component, } from '@angular/core';
import {Router} from '@angular/router';
import {MovieService} from '../../../service/movie/movie.service';
import {Movie} from '../../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'favorites',
  templateUrl: 'favorites.component.html',
  styleUrls: ['favorites.component.css']
})
export class FavoritesComponent {
  private checkMovies: boolean;
  private myFavoriteMovies: Movie[];
  private toggleFavorite: boolean = true;
  private myMovies: Movie[];

  constructor(private movieService: MovieService) {
    this.checkMovies = true;
    this.refreshMyMovies();

  }

  private refreshMyMovies(): void {
    this.movieService.fetchMyMovies()
      .subscribe(
        movies => this.myFavoriteMovies = movies);
  }

}
