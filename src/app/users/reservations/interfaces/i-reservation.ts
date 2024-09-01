export interface IReservation {
  apartmentId: number;
  apartmentName: string;
  bookingId: number;
  checkIn: string; 
  checkOut: string; 
  image: string;
  paymentMethod: string;
  totalGuests: number;
  totalPrice: number;
}
