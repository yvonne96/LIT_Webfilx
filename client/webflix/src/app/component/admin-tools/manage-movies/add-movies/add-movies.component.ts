import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../service/authentication/authentication.service';
import {MovieService} from '../../../../service/movie/movie.service';
import {Movie} from '../../../../model/movie';
import {RestService} from '../../../../service/api-client/rest.service';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';

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
  imageData;

  constructor(private movieService: MovieService, private router: Router,
              private authenticationService: AuthenticationService,
              private restService: RestService,
              ) {

    authenticationService.isAdmin
      .subscribe(x => this.isAdmin = x);
  }

  saveImageToFile(e) {

    if (e.srcElement.files && e.srcElement.files[0]) {
      let reader = new FileReader();

      reader.onload = function (ev) {
        $('#img')
          .attr('src', ev.target.result)
          .width(150)
          .height(200);
      };

      setTimeout(() =>  {
        this.image = document.getElementById('img').src;
      }, 2000);

      // this.movieService.addImage(this.image).delay(3000).subscribe(data => { console.log(data); });
      reader.readAsDataURL(e.srcElement.files[0]);
    }



    // let req = new XMLHttpRequest();
    // req.open('POST', 'http://localhost:8080/upload', true);
    // req.onload = function(Event) {
    //   if (req.status === 200) {
    //     console.log('Uploaded!!!');
    //   } else {
    //     console.log('Error ' + req.status + ' occured when trying to upload');
    //   }
    // };
    // req.send(formData);
  }

  addMovie() {
    console.log(this.image);
    console.log(this.title);
    console.log(this.mainCast);
    console.log(this.description);
    console.log(this.image);

    let newMovie = new Movie(this.title, this.year, this.classification, this.genre, this.price, this.description, this.mainCast, this.director, this.image);

    this.movieService.addMovie(newMovie, this.classification, this.genre)
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

