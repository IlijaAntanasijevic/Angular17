import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from '../../../../config/global';
import { IAddApartmentRequest } from '../interfaces/i-apartment';

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

  delete(id: number): Observable<any> {
    return this.http.delete(config.apiUrl + `api/apartment/${id}`)
  }

  getApartmentType(): Observable<any> {
    return this.http.get(config.apiUrl + "api/apartmenttype")
  }

  getFeatures(): Observable<any> {
    return this.http.get(config.apiUrl + "api/features")
  }

  getCountries(): Observable<any> {
    return this.http.get(config.apiUrl + "api/country")
  }
  getCitiesByCountryId(id: number): Observable<any> {
    //NOT IMPLEMENTED ON BACK -> CHANGE IT
    return this.http.get(config.apiUrl + "api/city")
  }

  getCities(): Observable<any> {
    return this.http.get(config.apiUrl + "api/city")
  }

  getPaymentMethods(): Observable<any> {
    return this.http.get(config.apiUrl + "api/payment")
  }


  submitInsert(data: IAddApartmentRequest): Observable<any> {
    return this.http.post(config.apiUrl + "api/apartment", data);
  }


}
