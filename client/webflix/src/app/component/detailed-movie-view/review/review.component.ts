import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../../../model/review';
import {ApiClient} from '../../../service/api-client/api-client.service';
import {Observable} from 'rxjs/Observable';
import {Account} from '../../../model/account';

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
    this.retrieveUserData(this.apiClient.getAccountByID(this.theReview.account_id));
  }

  retrieveUserData(source: Observable<Account>) {
    source
      .subscribe(userAccount => {
        this.userData = userAccount.firstname + userAccount.lastname + ' (' + userAccount.emailAddress + ')';
      }, error => ('Error getting user details for review'));
  }
}
