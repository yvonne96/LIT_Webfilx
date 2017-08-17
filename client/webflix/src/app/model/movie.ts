
export class Movie {
  id: number;
  title: string;
  year: string;
  classification: Classification;
  rating: number;
  director: string;
  cast: string;
  genre: Genre;
  price: number;
  description: string;
  image: string;
  purchasable: boolean;
  favorite: boolean;
}

export interface Classification {
  value: string;
  id: number;
}

export interface Genre {
  value: string;
  id: number;
}
