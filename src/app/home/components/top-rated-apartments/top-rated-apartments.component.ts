import { Component, OnInit } from '@angular/core';
import { IApartment } from '../../../apartments/interfaces/i-apartments';
import { ApartmentsRequestsService } from '../../../apartments/requests/apartments-requests.service';
import { config } from '../../../config/global';

@Component({
  selector: 'app-top-rated-apartments',
  templateUrl: './top-rated-apartments.html',
  styleUrl: './top-rated-apartments.css'
})
export class TopRatedApartments implements OnInit {
 
  constructor(
    public requestService: ApartmentsRequestsService
  ){}

  data: IApartment[] = [];
  public imgPath = config.apiUrl + "/apartments/mainImages/"

  getImagePath(path: string) {
    // console.log(path);
     let tmp = path.split("\\");
     let lastElement = tmp[tmp.length - 1];
     lastElement == "test" ? "b3a4a797-8f6b-4989-9934-6b65f9ac3e2b.jpg": lastElement;

     return this.imgPath + lastElement;
   } 


  ngOnInit(): void {
    this.requestService.getByPopulation().subscribe({
      next: (data: any) => {
        this.data = data.data.map((item: IApartment) => {
          return {
            ...item,
            mainImage: this.getImagePath(item.mainImage)
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
