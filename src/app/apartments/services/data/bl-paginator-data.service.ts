import { Injectable } from '@angular/core';
import { IPaginationData } from '../../interfaces/i-search';

@Injectable({
  providedIn: 'root'
})
export class BlPaginatorDataService {

  constructor() { }

  public paginationData: IPaginationData = {
    data: [],    
    pages: 0,
    perPage: 9,
    totalCount: 0
  };
}
