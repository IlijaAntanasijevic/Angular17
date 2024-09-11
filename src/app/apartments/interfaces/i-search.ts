export interface ISearch {
  checkIn: Date | null
  checkOut: Date | null
  location: string 
  //locationId: number
  guests: number | null
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