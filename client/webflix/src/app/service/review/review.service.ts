import {Observable} from 'rxjs/Observable';
import {Review} from '../../model/review';
export abstract class ReviewService {

  abstract createReview(accountID: number, movieID: number, comments: string, score: number): Observable<Boolean>;

  abstract getReviewsByMovieID(movieID: number) : Observable<Review[]>;
}
