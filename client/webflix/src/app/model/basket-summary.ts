import {Movie} from './movie';

export class BasketSummary {
  movies: Movie[];
  total: number;

  static empty(): BasketSummary {
    let empty = new BasketSummary();
    empty.movies = [];
    empty.total = 0;
    return empty;
  }
}
