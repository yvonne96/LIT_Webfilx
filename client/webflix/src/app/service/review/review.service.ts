import {Observable} from 'rxjs/Observable';
import {Review} from '../../model/review';
export abstract class ReviewService {

  abstract createReview(accountID: number, movieID: number, comments: string, score: number): Observable<Boolean>;

  abstract updateReview(accountID: number, movieID: number, comments: string, score: number): Observable<Boolean>;

  abstract getReviewsByMovieID(movieID: number) : Observable<Review[]>;

  abstract getAvgScoreByID(movieID: number) : Observable<number>;

  abstract deleteReview(reviewID: number): Observable<boolean>;
}
