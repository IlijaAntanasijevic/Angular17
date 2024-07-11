import { Component, OnInit } from '@angular/core';
import { IDestination } from '../../interfaces/i-destination';
import { LocationsRequestsService } from '../../requests/locations-requests.service';
import { Router } from '@angular/router';


/* TODO Errors
  - Console error 
*/
@Component({
  selector: 'app-trending-destinations',
  templateUrl: './trending-destinations.component.html',
  styleUrl: './trending-destinations.component.css'
})

export class TrendingDestinationsComponent implements OnInit {

  constructor(
    public requestService: LocationsRequestsService,
    private router: Router
  ){}

  data: IDestination[] = [];
  public top1Destination: IDestination;
   
  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(): void{
    this.requestService.getAllDestinations().subscribe({
      next: (data) => {
        this.data = data.sort((a,b) => b.totalApartments - a.totalApartments);
        this.top1Destination = data[0];
        this.data = data.filter(x => x.totalApartments < this.top1Destination.totalApartments);
        
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  searchByDestination(locationName: string): void {
    this.router.navigate(['/apartments'], {queryParams: {location: locationName}})
  }
}
