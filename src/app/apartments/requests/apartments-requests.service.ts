import { Injectable } from '@angular/core';
import { ApartmentsApiService } from '../api/apartments-api.service';
import { Observable } from 'rxjs';
import { IApartment, IApartmentDetail } from '../interfaces/i-apartments';
import { IPagination, ISearch } from '../interfaces/i-search';
import { IBookingAvailability } from '../../booking/components/interfaces/i-booking';
import { BookingService } from '../../booking/components/services/api/booking.service';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsRequestsService {
  constructor(
    private apiService: ApartmentsApiService,
    private bookingService: BookingService
  ) { }


  getByPopulation(): Observable<any[]>{
    return this.apiService.getByPopulation();
  }

  getOtherApartments(): Observable<any[]> {
    return this.apiService.getOtherApartments();
  }

  getAll(pagination: IPagination, search: ISearch = null): Observable<any>{
    return this.apiService.getAll(pagination, search);
  }

  getOneApartment(id: number): Observable<IApartmentDetail> {
    return this.apiService.getOne(id);
  }

  checkAvailability(data: IBookingAvailability): Observable<any> {
    return this.bookingService.checkAvailability(data);
  }
}
