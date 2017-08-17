import {Component} from '@angular/core';

@Component({
  selector: 'non-admin-warning',
  template: '<div style="color: white; font-size: 100px; text-align: center;">' +
  '<p>You don\'t have access to this page!</p>' +
  '<p><img src="app/component/admin-tools/angryBoss.jpg" height = "500" width="800" align="middle"></p> ' +
  '</div>'
})
export class NonAdminWarningComponent {
}
