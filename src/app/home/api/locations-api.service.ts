import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocation } from '../interfaces/i-location';
import { HttpClient } from '@angular/common/http';
import { IDestination } from '../interfaces/i-destination';

@Injectable({
  providedIn: 'root'
})
export class LocationsApiService {

  constructor(
    public http: HttpClient
  ) { }

  getAllLocations(): Observable<ILocation[]>{
    return this.http.get<ILocation[]>("assets/data/locations.json");
  }

  getTrendingDestinations(): Observable<IDestination[]>{
      return this.http.get<IDestination[]>("assets/data/trendingDestinations.json");
  }
  
}
