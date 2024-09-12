import { Component, OnInit } from '@angular/core';
import { IApartment } from '../../interfaces/i-apartments';
import { ApartmentsRequestsService } from '../../requests/apartments-requests.service';
import { ActivatedRoute } from '@angular/router';
import { IPagination, ISearch } from '../../interfaces/i-search';
import { SearchService} from '../../services/search-service.service';
import { Spinner } from '../../../shared/functions/spinner';
import { ImageUtils } from '../../../helpers/utility';
import { ImagePaths } from '../../../core/consts/image-paths';

@Component({
  selector: 'app-apartments-dashboard',
  templateUrl: './apartments-dashboard.component.html',
  styleUrl: './apartments-dashboard.component.css'
})
export class ApartmentsDashboardComponent implements OnInit {

  constructor(
    private requestService: ApartmentsRequestsService,
    private route: ActivatedRoute,
    public searchService: SearchService,
  ) {}

  apartments: IApartment[];
  displayedApartments: IApartment[];
  search: ISearch;
  notApartmentsFound: boolean = false;

  private pagination: IPagination = {
    page: 1,
    perPage: 9
  };

  ngOnInit(): void {
    this.getQueryData();
  }

  fetchData(search: ISearch = null): void {      
    Spinner.show();
      this.requestService.getAll(this.pagination).subscribe({
        next: (data) => {   
          this.searchService.paginationData = data;
          this.notApartmentsFound = data.length === 0;
          this.apartments = data.data;
          
          this.displayedApartments = this.apartments.map(item => ({
            ...item, 
            mainImage: ImageUtils.getImagePath(item.mainImage, ImagePaths.apartmenMainImages) 
        })); 
          Spinner.hide();    
        },
        error: (err) => {
          Spinner.hide();    
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

  onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    this.fetchData();
    
    window.scrollTo({
      top: 0,
      left: 0
    })
  }
}