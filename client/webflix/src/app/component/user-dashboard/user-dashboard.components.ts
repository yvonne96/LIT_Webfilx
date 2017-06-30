import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'user-dashboard',
  styleUrls: ['user-dashboard.component.css'],
  templateUrl: 'user-dashboard.component.html',
})
export class UserDashboardComponent {
  isAdmin: boolean;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
