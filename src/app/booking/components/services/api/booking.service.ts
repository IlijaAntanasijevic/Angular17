import { Injectable } from '@angular/core';
import { IBookingAvailability, IBookingRequest } from '../../interfaces/i-booking';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(public http: HttpClient) { }

  submitBooking(data: IBookingRequest): Observable<any> {
    return this.http.post(config.apiUrl + "api/bookings", data);
  }

  checkAvailability(data: IBookingAvailability): Observable<any> {
    return this.http.post(config.apiUrl + "api/booking/availability", data);
  }
}
