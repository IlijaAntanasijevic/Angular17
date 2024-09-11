// export interface IBookingForm {
//   pricePerNight: number;
//   totalPrice: number;
//   checkIn: Date;
//   checkOut: Date;
//   guests: number;
// }

export interface IBookingForm {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  pricePerNight: number;
  totalPrice: number;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}