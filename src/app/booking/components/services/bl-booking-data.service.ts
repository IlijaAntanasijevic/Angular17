import { Injectable } from '@angular/core';
import { IBookingForm } from '../interfaces/i-booking';

@Injectable({
  providedIn: 'root'
})
export class BlBookingDataService {

  constructor() { }

  private bookingData: IBookingForm = null;

  setBookingFormData(data: IBookingForm) {
    this.bookingData = data;
  }

  getBookingData(): IBookingForm {
    return this.bookingData;
  }
}
