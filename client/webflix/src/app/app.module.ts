import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule}    from '@angular/http';
import {FormsModule}    from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';

import {AdminToolsComponent} from './component/admin-tools/admin-tools.component';
import {APP_CONFIG, WEBFLIX_CONFIG} from './app-config';
import {AppComponent}  from './app.component';
import {BasketComponent}  from './component/basket/basket.component';
import {BasketButtonComponent}  from './component/basket-button/basket-button.component';
import {ErrorComponent} from './component/error/error.component';
import {LoginComponent} from './component/login/login.component';
import {MovieDisplayComponent}  from './component/movie-table/movie-table.component';
import {MovieTableRowComponent} from './component/movie-table/movie.table.row.component';
import {MovieSearchComponent} from './component/movie-search/movie-search.component';
import {MyMoviesComponent} from './component/my-movies/my-movies.component';
import {RegisterNewUserComponent} from './component/login/register-new-user.component';
import {UserDashboardComponent} from './component/user-dashboard/user-dashboard.components';

import {ApiClient} from './service/api-client/api-client.service';
import {AuthenticationService} from './service/authentication/authentication.service';
import {AuthorisedRestService} from './service/api-client/authorised-rest.service';
import {BasketService} from './service/basket/basket.service';
import {HttpBasketService} from './service/basket/http-basket.service';
import {HttpMovieService} from './service/movie/http-movie.service';
import {MovieService} from './service/movie/movie.service';
import {RestService} from './service/api-client/rest.service';
import {StorageService} from './service/storage/storage.service';

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterNewUserComponent},
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    children: [
      { path: '',
        component: MovieSearchComponent
      },
      { path: 'admin',
        component: AdminToolsComponent
      },
      { path: 'mymovies',
        component: MyMoviesComponent
      },
      { path: 'basket',
        component: BasketComponent
      },
    ]
  },
  {path: 'webflix', redirectTo: '/dashboard', pathMatch: 'prefix'},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AdminToolsComponent,
    AppComponent,
    BasketComponent,
    BasketButtonComponent,
    ErrorComponent,
    LoginComponent,
    MovieDisplayComponent,
    MovieSearchComponent,
    MovieTableRowComponent,
    MyMoviesComponent,
    RegisterNewUserComponent,
    UserDashboardComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {provide: APP_CONFIG, useValue: WEBFLIX_CONFIG},
    {provide: APP_BASE_HREF, useValue: '/'},
    ApiClient,
    AuthenticationService,
    {provide: BasketService, useClass: HttpBasketService},
    {provide: MovieService, useClass: HttpMovieService},
    {provide: RestService, useClass: AuthorisedRestService},
    StorageService
  ]
})
export class AppModule {
}
