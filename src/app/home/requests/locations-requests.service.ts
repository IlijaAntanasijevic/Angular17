import { Injectable } from '@angular/core';
import { LocationsApiService } from '../api/locations-api.service';
import { Observable } from 'rxjs';
import { ILocation } from '../interfaces/i-location';
import { IDestination } from '../interfaces/i-destination';
import { UserApartmentsService } from '../../users/user-apartments/services/api/user-apartments.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsRequestsService {

  constructor(
    private apiService: LocationsApiService,
    private userApartmentsService: UserApartmentsService
  ) { }


  // getAllLocations(): Observable<ILocation[]>{
  //   return this.apiService.getAllLocations();
  // }

  getAllDestinations(): Observable<IDestination[]>{
    return this.apiService.getTrendingDestinations();
  }

  getAllLocations(): Observable<any> {
    return this.userApartmentsService.getCities();
  }
}
