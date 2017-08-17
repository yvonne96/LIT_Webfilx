import {Component, } from '@angular/core';
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
  private favorite: boolean;

  constructor(private movieService: MovieService) {
    this.checkMovies = true;
    this.refreshMyMovies();

  }

  private refreshMyMovies(): void {
    this.movieService.getMyFavorites()
      .subscribe(movies => {
        this.myFavoriteMovies = movies;
        console.log(this.myFavoriteMovies);
      });
  }

  toggleFavorite(movie: Movie) {
    this.refreshMyMovies();
    this.favorite = false;
    this.movieService.toggleFavorite(movie.id, this.favorite)
      .subscribe(() => this.refreshMyMovies());
  }

}
