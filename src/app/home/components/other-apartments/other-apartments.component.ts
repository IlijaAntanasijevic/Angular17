import { Component } from '@angular/core';
import { IApartment } from '../../../apartments/interfaces/i-apartments';
import { ApartmentsRequestsService } from '../../../apartments/requests/apartments-requests.service';
import { config } from '../../../config/global';
import { ImageUtils } from '../../../config/utility';

@Component({
  selector: 'app-other-apartments',
  templateUrl: './other-apartments.component.html',
  styleUrl: './other-apartments.component.css'
})
export class OtherApartmentsComponent {
  constructor(
    public requestService: ApartmentsRequestsService
  ){}

  data: IApartment[] = [];

  ngOnInit(): void {
    this.requestService.getOtherApartments().subscribe({
      next: (data: any) => {
        this.data = data.data.map((item: IApartment) => {
          return {
            ...item,
            mainImage: ImageUtils.getImagePath(item.mainImage, "apartments/mainImages")
          };
        });
        console.log(this.data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
