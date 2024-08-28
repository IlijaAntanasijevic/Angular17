import { Injectable } from '@angular/core';
import { UserApartmentsService } from '../api/user-apartments.service';
import { forkJoin, Observable } from 'rxjs';
import { IAddApartmentForm, IAddApartmentRequest } from '../interfaces/i-apartment';

@Injectable({
  providedIn: 'root'
})
export class BlUserApartmentsRequestsService {

  constructor(
    private apiService: UserApartmentsService
  ) { }

  getAllUserApartments(userId: number): Observable<any> {
    return this.apiService.getAllUserApartments(userId);
  }

  getById(id: number): Observable<any>{
    return this.apiService.getApartment(id);
  }

  delete(id: number): Observable<any> {    
    return this.apiService.delete(id);
  }

  getApartmentType(): Observable<any> {
    return this.apiService.getApartmentType();
  }

  getFeatures(): Observable<any> {
    return this.apiService.getFeatures();
  }

  getCities(): Observable<any> {
    return this.apiService.getCities();
  }

  getCountries(): Observable<any> {
    return this.apiService.getCountries();
  }

  getCitiesByCountryId(id: number): Observable<any> {
    return this.apiService.getCitiesByCountryId(id);
  }

  getPaymentMethods(): Observable<any> {
    return this.apiService.getPaymentMethods();
  }

  getAllData(): Observable<any> {
    const request = [
      this.getApartmentType(),
      this.getFeatures(),
      this.getCountries(),
      this.getPaymentMethods()
    ];

    return forkJoin(request);
  }


  submitInsert(data: IAddApartmentForm): Observable<any> {
    return this.apiService.submitInsert(data);
  }

}
