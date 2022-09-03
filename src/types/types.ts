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

export interface User {
  username: string;
  city: string;
  country: string;
  createdAt: string;
  email: string;
  phone: string;
  updatedAt: string;
}

export interface Room {
  createdAt: string;
  desc: string;
  maxPeople: number;
  price: number;
  title: string;
  updatedAt: string;
  roomNumbers: RoomNumber[];
  __v: number;
  _id: string;
}

interface RoomNumber {
  number: string;
  unavailableDates: string[];
  _id: string;
}

export interface ErrorResponse {
  message: string;
  stack: string;
  status: number;
  success: boolean;
}
