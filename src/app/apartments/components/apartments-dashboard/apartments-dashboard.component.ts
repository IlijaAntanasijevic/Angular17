import { Component, OnInit } from '@angular/core';
import { IApartment } from '../../interfaces/i-apartments';
import { ApartmentsRequestsService } from '../../requests/apartments-requests.service';
import { ActivatedRoute } from '@angular/router';
import { ISearch } from '../../interfaces/i-search';
import { SearchService} from '../../services/search-service.service';

@Component({
  selector: 'app-apartments-dashboard',
  templateUrl: './apartments-dashboard.component.html',
  styleUrl: './apartments-dashboard.component.css'
})
export class ApartmentsDashboardComponent implements OnInit {

  constructor(
    private requestService: ApartmentsRequestsService,
    private route: ActivatedRoute,
    private searchService: SearchService
  ) {}

  apartments: IApartment[];
  displayedApartments: IApartment[];
  search: ISearch;
  notApartmentsFound: boolean = false;

  ngOnInit(): void {
    this.getQueryData();
  }

  fetchData(search: ISearch = null): void {      
      this.requestService.getAll(search).subscribe({
        next: (data) => {
          this.notApartmentsFound = data.length === 0;
          this.apartments = data;
          this.displayedApartments = this.apartments.slice(0, 9);           
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  getQueryData() {
    this.route.queryParams.subscribe(params => {
      if(params['checkIn'] && params['checkOut'] && params['location'] && params['guests']){
        this.search = {
          checkIn: params['checkIn'],
          checkOut: params['checkOut'],
          location: params['location'],
          guests: params['guests']
        };
        this.searchService.setData(this.search);
        this.fetchData(this.search);
      }
      //Search by trending destination
      else if(params['location']){
        this.search = {
          checkIn: null,
          checkOut: null,
          location: params['location'],
          guests: null
        }
        this.fetchData(this.search);
      }
      else {
        this.fetchData();
      }
 
    })
  }

  onPageChange(apartments: IApartment[]): void {
    this.displayedApartments = apartments;
    window.scrollTo({
      top: 0,
      left: 0
    })
  }
}