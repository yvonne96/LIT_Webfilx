
export class Movie {
  id: number;
  title: string;
  year: string;
  classification: Classification;
  rating: number;
  director: string;
  cast: string;
  purchasable: boolean;
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
