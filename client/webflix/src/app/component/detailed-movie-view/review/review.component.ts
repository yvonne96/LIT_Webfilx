import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Review} from '../../../model/review';
import {ApiClient} from '../../../service/api-client/api-client.service';
import {Observable} from 'rxjs/Observable';
import {Account} from '../../../model/account';
import {ReviewService} from '../../../service/review/review.service';

@Component({
  moduleId: module.id,
  selector: 'review',
  templateUrl: 'review.component.html',
  styleUrls: ['review.component.css'],
})

export class ReviewComponent implements OnInit {
  @Input('theReview')
  theReview: Review;

  @Input('currentUserID')
  currentUserID: number;

  @Output()
  onDeleteReview = new EventEmitter();

  public userData: string;
  public isUserReview: boolean = false;

  constructor(private apiClient: ApiClient,
              private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.retrieveUserData(this.apiClient.getAccountByID(this.theReview.account_id));
    this.checkIfUsersReview();
  }

  retrieveUserData(source: Observable<Account>) {
    source
      .subscribe(userAccount => {
        this.userData = userAccount.firstname + userAccount.lastname + ' (' + userAccount.emailAddress + ')';
      }, error => ('Error getting user details for review'));
  }

  checkIfUsersReview() {
    if (this.theReview.account_id === this.currentUserID) {
      this.isUserReview = true;
    }
  }

  deleteReview() {
    this.reviewService.deleteReview(this.theReview.review_id)
      .subscribe(() => {
      this.onDeleteReview.emit();
    }, error => ('Error deleting review'));
  }
}
