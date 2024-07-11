import { Component, OnInit } from '@angular/core';
import { IApartment } from '../../../apartments/interfaces/i-apartments';
import { ApartmentsRequestsService } from '../../../apartments/requests/apartments-requests.service';

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
   
  ngOnInit(): void {
    this.requestService.getTopRated().subscribe({
      next: (data) => {
        this.data = data;
        // console.log(data);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
