
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

  createReview(accountID: number, movieID: number, comments: string, score: number): Observable<Boolean>{
    return this.restService.post(baseURL + '/' + accountID + '/' + movieID + '/' + comments + '/' + score)
      .build()
      .map(() => true)
      .catch(error => {
        console.log('Error creating review');
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
}
