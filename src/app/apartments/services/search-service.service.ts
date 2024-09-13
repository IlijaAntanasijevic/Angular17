import { Injectable } from '@angular/core';
import { IPaginationData, ISearch } from '../interfaces/i-search';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public searchData: BehaviorSubject<ISearch> = new BehaviorSubject<ISearch>(null);


  // setData(search: ISearch) {
  //   this.searchData = search;
  // }
  // get getData() {
  //   return this.searchData;
  // }

  
  public paginationData: IPaginationData = {
    data: [],    
    pages: 0,
    perPage: 9,
    totalCount: 0
  };
}
