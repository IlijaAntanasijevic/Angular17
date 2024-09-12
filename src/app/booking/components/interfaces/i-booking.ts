interface IBookingBase {
  totalGuests: number;
  checkIn: Date;
  checkOut: Date;
}

export interface IBooking extends IBookingBase {
  apartmentId: number;
  pricePerNight: number;
  totalPrice: number;
  paymentId: number;
  paymentTitle: string;
}

export interface IBookingForm extends IBookingBase{
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pricePerNight: number;
  totalPrice: number;
  paymentId: number;
}

export interface IBookingRequest extends IBookingBase{
  paymentId: number;
  apartmentId: number;

}

export interface IBookingApartment {
  mainImage: string;
  city: string;
  country: string;
  apartmentType: string;
  address: string;
  name: string;

}