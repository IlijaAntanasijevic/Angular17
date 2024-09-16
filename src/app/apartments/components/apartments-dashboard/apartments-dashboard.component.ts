import { Component, OnDestroy, OnInit } from '@angular/core';
import { IApartment } from '../../interfaces/i-apartments';
import { ApartmentsRequestsService } from '../../requests/apartments-requests.service';
import { ActivatedRoute } from '@angular/router';
import { IPagination, ISearch } from '../../interfaces/i-search';
import { SearchService} from '../../services/search-service.service';
import { Spinner } from '../../../shared/functions/spinner';
import { ImageUtils } from '../../../helpers/utility';
import { ImagePaths } from '../../../core/consts/image-paths';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-apartments-dashboard',
  templateUrl: './apartments-dashboard.component.html',
  styleUrl: './apartments-dashboard.component.css'
})
export class ApartmentsDashboardComponent implements OnInit, OnDestroy {

  constructor(
    private requestService: ApartmentsRequestsService,
    private route: ActivatedRoute,
    public searchService: SearchService,
  ) {}

  apartments: IApartment[];
  displayedApartments: IApartment[];
  search: ISearch;
  notApartmentsFound: boolean = false;
  totalCountApartments: number = null;

  private subscription: Subscription = new Subscription();

  private pagination: IPagination = {
    page: 1,
    perPage: 9
  };

  ngOnInit(): void {
    this.getSearchedData();
  }

  getSearchedData() {   
   this.subscription.add(
    this.searchService.searchData.subscribe({
      next: (data) =>{        
        if(data){
          this.search = data;
        }
        this.fetchData();  
      }
    })
   )
  }

  fetchData(): void {      
    Spinner.show();
      this.subscription.add(
        this.requestService.getAll(this.pagination, this.search).subscribe({
          next: (data) => {   
            this.searchService.paginationData = data;
            this.notApartmentsFound = data.length === 0;
            this.apartments = data.data;
            this.totalCountApartments = data.totalCount;         
            
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
      )
  }


  onPageChange(pageNumber: number): void {
    this.pagination.page = pageNumber;
    this.fetchData();
    
    window.scrollTo({
      top: 0,
      left: 0
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}