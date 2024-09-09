import { Injectable } from '@angular/core';
import { ApartmentsApiService } from '../api/apartments-api.service';
import { Observable } from 'rxjs';
import { IApartment, IApartmentDetail } from '../interfaces/i-apartments';
import { ISearch } from '../interfaces/i-search';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsRequestsService {
  constructor(
    private apiService: ApartmentsApiService
  ) { }


  getByPopulation(): Observable<any[]>{
    return this.apiService.getByPopulation();
  }

  getOtherApartments(): Observable<any[]> {
    return this.apiService.getOtherApartments();
  }

  getAll(search: ISearch = null): Observable<IApartment[]>{

    if(search && search.location && search.checkIn && search.checkOut && search.guests){
      return this.apiService.getSearchedData(search);
    }
    else if(search && search.location){
      return this.apiService.getApartmentsByLocation(search.location)
    }
    //console.log(search);

    return this.apiService.getAll();
  }

  getOneApartment(id: number): Observable<IApartmentDetail> {
    return this.apiService.getOne(id);
  }
}
