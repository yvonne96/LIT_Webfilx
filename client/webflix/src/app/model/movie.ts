
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
  mainCast: string;
  image: string;
}

export interface Classification {
  value: string;
  id: number;
}

export interface Genre {
  value: string;
  id: number;
}
