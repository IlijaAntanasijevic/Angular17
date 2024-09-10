import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { IApartment, IApartmentDetail } from '../interfaces/i-apartments';
import { ISearch } from '../interfaces/i-search';
import { apiPath } from '../../config/api';
import { config } from '../../config/global';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsApiService {

  constructor(
    public http: HttpClient
  ) {}

  // getAll(topRated: boolean = false): Observable<IApartment[]> {
  //   if(topRated){
  //     return this.http.get<IApartment[]>("assets/data/favoriteApartments.json");
  //   }
  //   return this.http.get<IApartment[]>("assets/data/apartments.json");
  // }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(config.apiUrl + "api/apartment")
  }

  getByPopulation(): Observable<any[]>{
    return this.http.get<any[]>(config.apiUrl  + "api/apartment?Sorts[0].SortProperty=popular&PerPage=6")
  }

  getOtherApartments(): Observable<any[]> {
    return this.http.get<any[]>(config.apiUrl + "api/apartment?Sorts[0].SortProperty=popular&PerPage=6&Page=2")
  }

  getOne(id: number): Observable<IApartmentDetail>{
    return this.http.get<IApartmentDetail>(config.apiUrl + `api/apartment/${id}`);
  }

  getSearchedData(search: ISearch): Observable<any[]> {
    return this.http.get<any[]>("assets/data/apartments.json").pipe(map((apartments: any) => {
      return apartments.filter((x: any) => x.city == search.location && search.guests <= x.maxGuest)
      
    }))
  } 

  getApartmentsByLocation(location: string): Observable<any[]> {
    return this.http.get<any[]>("assets/data/apartments.json").pipe(map((apartments: any) => {
      return apartments.filter((x: any) => x.city == location)
   
    }))
  }


}
