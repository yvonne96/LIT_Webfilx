import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {
  private emailAddress: string;
  private password: string;
  private isLoading: boolean;
  private errorMessage: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  login() {
    this.isLoading = true;
    this.clearLoginFailureMessage();
    this.authenticationService.login(this.emailAddress, this.password)
      .subscribe(
        next => {
          this.router.navigate(['/dashboard']);
        },
        error => {
          this.setLoginFailureMessage();
        }
      );

    return false;
  }

  setLoginFailureMessage() {
    this.errorMessage = 'Login failed, please try again.';
    this.isLoading = false;
  }

  clearLoginFailureMessage() {
    this.errorMessage = null;
  }
}
