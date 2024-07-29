import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  constructor(
    private http: HttpClient
  ) { }

  getAll() : Observable<any> {
    return this.http.get(config.apiUrl + "api/bookings");
  }


}
