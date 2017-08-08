import {Movie} from './movie';

export class WishlistSummary {
  movies: Movie[];
  total: number;

  static empty(): WishlistSummary {
    let empty = new WishlistSummary();
    empty.movies = [];
    empty.total = 0;
    return empty;
  }
}
