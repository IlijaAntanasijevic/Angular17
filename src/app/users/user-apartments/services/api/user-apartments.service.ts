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

  getApartment(id: number): Observable<any> {
    return this.http.get(config.apiUrl + `api/apartment/${id}`);
  }

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
    return this.http.get(config.apiUrl + `api/citycountry/${id}`)
  }

  getCities(): Observable<any> {
    return this.http.get(config.apiUrl + "api/city")
  }

  getPaymentMethods(): Observable<any> {
    return this.http.get(config.apiUrl + "api/payment")
  }

  //NE RADI (MENI MOZAK) - PREPRAVITI
  uploadImages(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name)

    return this.http.post(config.apiUrl + "api/files", formData)
  }

  submitInsert(data: IAddApartmentRequest): Observable<any> {
    return this.http.post(config.apiUrl + "api/apartment", data);
  }

  submitUpdate(data: IAddApartmentRequest, id: number): Observable<any> {
    return this.http.put(config.apiUrl + `api/apartment/${id}`, data);
  }


}
