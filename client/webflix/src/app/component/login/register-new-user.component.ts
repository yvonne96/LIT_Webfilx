import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from '../../model/user';

@Component({
  moduleId: module.id,
  selector: 'register-new-user',
  templateUrl: 'register-new-user.component.html'
})
export class RegisterNewUserComponent {
  private emailAddress: string;
  private firstname: string;
  private lastname: string;
  private password: string;
  private repeatPassword: string;
  private isLoading: boolean;
  private errorMessage: string;
  private isError: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.repeatPassword = '';
  }

  register() {
    this.isLoading = true;
    let user = new User(this.emailAddress, this.password, this.firstname, this.lastname);
    this.clearLoginFailureMessage();
    if (this.validate()) {
      this.authenticationService.register(user)
        .subscribe(
          next => {
            this.router.navigate(['/login']);
          },
          error => {
            this.setLoginFailureMessage();
          }
        );
    }
    this.setLoginFailureMessage();
    return false;
    }

  validate() {
    this.isError = false;
    this.emailValidation();
    this.emailValidation();
    this.passwordRestrictions();
    return !(this.isError);
  }
  emailValidation() {
    let matcher = new RegExp(/([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/g);
    if (!(matcher.test(this.emailAddress))) {
      this.isError = true;
      return true;
    }
    return false;
  }
  passwordValidation() {
    if (this.password !== this.repeatPassword){
      this.isError = true;
      return true;
    }
    return false;
  }

  passwordRestrictions() {
    let matcher = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,}/g);
    // regular exp tests for specified test restrictions and white space
    if (!(matcher.test(this.password))) {
      this.isError = true;
      return true;
    }
    return false;
  }

  setLoginFailureMessage() {
    this.errorMessage = 'Registration failed.';
    this.isLoading = false;
  }

  clearLoginFailureMessage() {
    this.errorMessage = null;
  }
}
