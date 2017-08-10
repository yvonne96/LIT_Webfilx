import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../model/review';
import {ApiClient} from '../../../service/api-client/api-client.service';
import {Observable} from 'rxjs/Observable';

@Component({
  moduleId: module.id,
  selector: 'review',
  templateUrl: 'review.component.html',
  styleUrls: ['review.component.css'],
})

export class ReviewComponent implements OnInit {
  @Input('theReview')
  theReview: Review;
  public userData: string;

  constructor(private apiClient: ApiClient) {
  }

  ngOnInit() {
    console.log(this.theReview.account_id);
    this.retrieveUserData(this.apiClient.getCurrentAccountUsernameEmail(this.theReview.account_id));
  }

  retrieveUserData(source: Observable<string>){
    source
      .subscribe(userData => {
        this.userData = userData;
      }, error => ('Error getting user details for review'));
  }
}
