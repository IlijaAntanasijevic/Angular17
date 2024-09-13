import { IBaseName } from "../../interfaces/i-base";

export interface ISearch {
  checkIn: Date
  checkOut: Date
  city: IBaseName;
  guests: number
} 

export interface IPagination {
  page: number;
  perPage: number;
}

export interface IPaginationData {
  data: any[];
  pages: number;
  perPage: number;
  totalCount: number;
}