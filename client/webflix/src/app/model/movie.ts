export class Movie {
  id: number;
  title: string;
  year: string;
  classification: Classification;
  genre: Genre;
  price: number;
  description: string;
}

interface Classification {
  value: string;
}

interface Genre {
  value: string;
}
