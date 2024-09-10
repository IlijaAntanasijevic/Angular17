import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ApartmentsRequestsService } from '../../../requests/apartments-requests.service';
import { IApartmentDetail } from '../../../interfaces/i-apartments';
import { MatDialog } from '@angular/material/dialog';
import { ApartmentDetailFormComponent } from '../apartment-form/apartment-detail-form.component';
import { SearchService } from '../../../services/search-service.service';
import { config } from '../../../../config/global';
import { ImageUtils } from '../../../../config/utility';
import { Spinner } from '../../../../shared/functions/spinner';
import { ImagePaths } from '../../../../core/consts/image-paths';

@Component({
  selector: 'app-apartment-detail',
  templateUrl: './apartment-detail.component.html',
  styleUrl: './apartment-detail.component.css'
})
export class ApartmentDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private requestService: ApartmentsRequestsService,
    private dialog: MatDialog
  ) { }
  
  id: number;
  apartment: IApartmentDetail;
  sliderImages: any;
  featuresFirstColum: string[];
  featuresSecondColum: string[];
  public mainImagePath: string;

  ngOnInit(): void {
    this.fetchData();
    this.scrollToTop();
 
  }

  fetchData(): void {
    Spinner.show();
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.requestService.getOneApartment(this.id).subscribe({
      next: (data) => {
        this.apartment = data;
        this.sliderImages = data.images.slice(0,4).map(path => {          
          return ImageUtils.getImagePath(path, ImagePaths.apartmenImages);
        })
        this.mainImagePath = ImageUtils.getImagePath(data.mainImage, ImagePaths.apartmenMainImages);

        let divideFeatures = Math.ceil(data.features.length / 2);
        this.featuresFirstColum = data.features.slice(0, divideFeatures);
        this.featuresSecondColum = data.features.slice(divideFeatures);
        Spinner.hide();
       
      },
      error: (err) => {
        Spinner.hide();        
      }
    })
  }

  scrollToTop(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      })
  });
  }


}
