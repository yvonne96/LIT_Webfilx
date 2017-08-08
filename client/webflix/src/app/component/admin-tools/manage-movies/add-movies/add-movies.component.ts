import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';
import {Movie} from '../../../../model/movie';

@Component({
  moduleId: module.id,
  selector: 'add-movies',
   styleUrls: ['add-movies.component.css'],
  templateUrl: 'add-movies.component.html'
})

export class AddMoviesComponent {

  private isAdmin: boolean;
  private title: string;
  private year: string;
  private genre: number;
  private classification: number;
  private director: string;
  private price: number;
  private mainCast: string;
  private description: string;
  private image: string;

  constructor(private movieService: MovieService, private router: Router,
              private authenticationService: AuthenticationService,
              ) {

    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
  }

  saveImageToFile(e) {
    this.image = e.srcElement.files[0].name;
  }
  addMovie() {

    this.movieService.addMovie(this.title, this.year, this.genre,
      this.classification, this.director, this.mainCast, this.description, this.title + '.jpg')
      .subscribe(
        next => {
          this.router.navigate(['/dashboard/admin/manage-movies']);
        },
        error => {
          console.log('Error adding movie');
          // this.setCreateFailureMessage();
        }
      );
  }

  addPrice() {
    console.log(this.price);
    this.movieService.addPrice(this.price)
      .subscribe(
        () => {
          console.log('added');
          console.log(this.price);
        },
        error => {
          console.log('Error adding movie');
        }
      );
  }

}

