import {Component} from '@angular/core';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'admin-tools',
  templateUrl: 'admin-tools.component.html',
  styleUrls: ['admin-tools.component.css'],
})
export class AdminToolsComponent {
  private isAdmin: boolean;
  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
  }
}
