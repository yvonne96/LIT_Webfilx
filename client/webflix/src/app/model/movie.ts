
export class Movie {
  id: number;
  title: string;
  year: string;
  classification: Classification;
  genre: Genre;
  price: number;
  description: string;
  mainCast: string;
  director: string;
  image: string;

  constructor(title: string,
              year: string,
              classificaiton: Classification,
              genre: Genre,
              price: number,
              description: string,
              mainCast: string,
              director: string,
              image: string) {
    this.title = title;
    this.year = year;
    this.classification = classificaiton;
    this.genre = genre;
    this.price = price;
    this.description = description;
    this.mainCast = mainCast;
    this.director = director;
    this.image = image;
  }
}

interface Classification {
  value: string;
}

interface Genre {
  value: string;
}
