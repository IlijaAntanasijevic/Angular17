import { Injectable } from '@angular/core';
import { ISearch } from '../interfaces/i-search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchData: ISearch;


  setData(search: ISearch) {
    this.searchData = search;
  }
  get getData() {
    return this.searchData;
  }

}
