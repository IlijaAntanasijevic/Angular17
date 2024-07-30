import { Component, OnInit } from '@angular/core';
import { BlReservationsRequestsService } from '../../services/requests/bl-reservations-requests.service';
import { config } from '../../../../config/global';

@Component({
  selector: 'app-previous-reservations',
  templateUrl: './previous-reservations.component.html',
  styleUrl: './previous-reservations.component.css'
})
export class PreviousReservationsComponent implements OnInit{

  constructor(
    private requestService: BlReservationsRequestsService
  ) {}

  public reservations: any;
  public imgPath = config.apiUrl + "/apartments/mainImages/"
  displayedColumns: string[] = ['image','apartmentName', 'dates', 'guests', 'payment','price'];

  ngOnInit(): void {
      this.getAllReservations();
  }

  getAllReservations() {
    this.requestService.getAll().subscribe({
      next: (data) => {
        console.log(data);
        this.reservations = data.data;
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  getImagePath(path: string) {
   // console.log(path);
    let tmp = path.split("\\");
    let lastElement = tmp[tmp.length - 1];
 
    return lastElement;
    
    
  }

}
