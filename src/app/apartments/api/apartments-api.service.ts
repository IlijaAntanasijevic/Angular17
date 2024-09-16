import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { IApartmentDetail } from '../interfaces/i-apartments';
import { IPagination, ISearch } from '../interfaces/i-search';
import { config } from '../../config/global';

@Injectable({
  providedIn: 'root'
})
export class ApartmentsApiService {

  constructor(
    public http: HttpClient
  ) {}


  getAll(pagination: IPagination, search: ISearch = null): Observable<any[]> {    
    let queryParams = `page=${pagination.page}&perPage=${pagination.perPage}`;
    if (search) {
      queryParams += `&checkIn=${search.checkIn.toISOString()}&checkOut=${search.checkOut.toISOString()}&cityId=${search.city.id}&guests=${search.guests}`;
    }
    return this.http.get<any[]>(config.apiUrl + `api/apartment?${queryParams}`)
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


}
