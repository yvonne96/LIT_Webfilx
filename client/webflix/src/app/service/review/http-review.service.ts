
import {ReviewService} from './review.service';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {RestService} from '../api-client/rest.service';
import {Observable} from 'rxjs/Observable';
import {Review} from '../../model/review';

const baseURL = '/review';

@Injectable()
export class HttpReviewService extends ReviewService {

  constructor(private http: Http,
              private restService: RestService) {
    super();
  }

  createReview(accountID: number, movieID: number, comments: string, score: number): Observable<Boolean> {
    return this.restService.post(baseURL + '/add/' + accountID + '/' + movieID + '/' + comments + '/' + score + '/')
      .build()
      .map(() => true)
      .catch(error => {
        console.log('Error creating review');
        return Observable.of(false);
      });
  }

  updateReview(accountID: number, movieID: number, comments: string, score: number): Observable<Boolean> {
    return this.restService.post(baseURL + '/update/' + accountID + '/' + movieID + '/' + comments + '/' + score + '/')
      .build()
      .map(() => true)
      .catch(error => {
        console.log('Error updating review');
        return Observable.of(false);
      });
  }

  getReviewsByMovieID(movieID: number): Observable<Review[]> {
    return this.restService.get(baseURL + '/' + movieID)
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('Error getting reviews');
        return Observable.of([]);
      });
  }

  getAvgScoreByID(movieID: number): Observable<number> {
    return this.restService.get(baseURL + '/reviewAverageScore/' + movieID)
      .build()
      .map(resp => resp.json())
      .catch(error => {
        console.log('Error pulling average review score for movie');
        return Observable.of(0);
      });
  }

  deleteReview(reviewID: number): Observable<boolean> {
    return this.restService.delete(baseURL + '/deleteReview/' + reviewID)
      .build()
      .map(() => true)
      .catch(error => {
        console.log('Error deleting user review');
        return Observable.of(false);
      });
  }
}
