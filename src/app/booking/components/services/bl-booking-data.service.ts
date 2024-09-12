import { Injectable } from '@angular/core';
import { IBooking, IBookingForm } from '../interfaces/i-booking';

@Injectable({
  providedIn: 'root'
})
export class BlBookingDataService {

  constructor() { }

  private bookingData: IBooking = null;

  setBookingFormData(data: IBooking) {
    this.bookingData = data;
  }

  getBookingData(): IBooking {
    return this.bookingData;
  }
}
