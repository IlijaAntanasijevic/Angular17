import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { IApartment, IApartmentDetail } from '../interfaces/i-apartments';
import { ISearch } from '../interfaces/i-search';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsApiService {

  constructor(
    public http: HttpClient
  ) {}

  getAll(topRated: boolean = false): Observable<IApartment[]> {
    if(topRated){
      return this.http.get<IApartment[]>("assets/data/favoriteApartments.json");
    }
    return this.http.get<IApartment[]>("assets/data/apartments.json");
  }

  getOne(id: number): Observable<IApartmentDetail>{
    return this.http.get<IApartmentDetail>("assets/data/apartmentsDetails.json").pipe(map((apartments: any) => {
      let findApartment = apartments.find((x: any) => x.id == id);
      return findApartment;
    }));
  }

  getSearchedData(search: ISearch): Observable<IApartment[]> {
    return this.http.get<IApartment[]>("assets/data/apartments.json").pipe(map((apartments: any) => {
      let searchApartment = apartments.filter((x: any) => x.city == search.location && search.guests <= x.maxGuest)
      return searchApartment;
    }))
  } 

  getApartmentsByLocation(location: string): Observable<IApartment[]> {
    return this.http.get<IApartment[]>("assets/data/apartments.json").pipe(map((apartments: any) => {
      let searchApartmentByLocation = apartments.filter((x: any) => x.city == location)
      return searchApartmentByLocation;
    }))
  }


}
