import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class UserApartmentsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUserApartments(userId: number): Observable<any> {
    return this.http.get(config.apiUrl + `api/apartment?userid=${userId}`)
  }
}
