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
  rooms: string[];
  cheapestPrice: number;
  featured: boolean;
  __v: number;
  _id: number;
}

export interface User{
  username: string,
  city: string,
  country:string,
  createdAt: string,
  email: string,
  phone: string,
  updatedAt:string,
}

export interface ErrorResponse {
  message: string;
  stack: string;
  status: number;
  success: boolean;
}
