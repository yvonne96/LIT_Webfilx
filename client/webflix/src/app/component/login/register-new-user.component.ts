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

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.repeatPassword = '';
  }

  register() {
    this.isLoading = true;
    let user = new User(this.emailAddress, this.password, this.firstname, this.lastname);
    this.clearLoginFailureMessage();
    this.authenticationService.register(user)
      .subscribe(
        next => {
          this.router.navigate(['/login']);
        },
        error => {
          this.setLoginFailureMessage();
        }
      );

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
