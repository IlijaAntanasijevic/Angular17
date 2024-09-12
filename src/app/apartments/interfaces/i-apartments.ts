import { IBaseName } from "../../interfaces/i-base"
import { IUser } from "../../users/profile/interfaces/i-user"


export interface IApartment extends IBaseName {
  mainImage: string;
  pricePerNight: number;    
  totalReviews: number;
  rate: number;
  maxGuest: number;
  city: string;
  price?: number;
  maxGuests?: number;
  totalBookings?: number;
} 

export interface IApartmentDetail extends IApartment {
  location: string;
  images: string[];
  user: IUser;
  totalBookings: number;
  description: string;
  features: string[];
  paymentMethodIds?: number[];
  paymentMethods: string[];
  apartmentType: string;
  country: string;
  address?: string;

}
