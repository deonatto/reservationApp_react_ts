export interface Options {
  adult: number;
  children: number;
  room: number;
}
export interface Hotel {
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: string[];
  title: string;
  desc: string;
  rating: number;
  rooms: string;
  cheapestPrice: number;
  featured: boolean;
}
