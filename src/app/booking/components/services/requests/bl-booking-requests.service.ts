import { Injectable } from '@angular/core';
import { ApartmentsRequestsService } from '../../../../apartments/requests/apartments-requests.service';
import { AuthService } from '../../../../shared/buisiness-logic/auth.service';
import { forkJoin, Observable } from 'rxjs';
import { UsersApiService } from '../../../../users/profile/services/api/users-api.service';
import { BookingService } from '../api/booking.service';
import { IBookingRequest } from '../../interfaces/i-booking';
import { ApartmentsApiService } from '../../../../apartments/api/apartments-api.service';

@Injectable({
  providedIn: 'root'
})
export class BlBookingRequestsService {

  constructor(
    private apiService: BookingService,
    private apartmentService: ApartmentsApiService,
    private authService: AuthService,
    private userService: UsersApiService
  ) { }

  getApartmentData(id: number): Observable<any> {
    return this.apartmentService.getOne(id);
  }

  getUser(): Observable<any> {
    let userId = this.authService.getUserId();
    console.log(userId);
    
    return this.userService.get(userId);
  }

  getAllData(apartmentId: number): Observable<any> {
    let requests = {
      'apartment': this.getApartmentData(apartmentId),
      'user': this.getUser()
    };

    return forkJoin(requests);
  }

  submitBooking(data: IBookingRequest): Observable<any> {
    return this.apiService.submitBooking(data);
  }
}
