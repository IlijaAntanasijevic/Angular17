import { Component, OnInit } from '@angular/core';
import { BlReservationsRequestsService } from '../../services/requests/bl-reservations-requests.service';
import { config } from '../../../../config/global';
import { IReservation } from '../../interfaces/i-reservation';
import { MatDialog } from '@angular/material/dialog';
import { SimpleConfirmationDialogComponent } from '../../../../core/simple-confirmation-dialog/simple-confirmation-dialog.component';
import { Spinner } from '../../../../shared/functions/spinner';

@Component({
  selector: 'app-previous-reservations',
  templateUrl: './previous-reservations.component.html',
  styleUrl: './previous-reservations.component.css'
})
export class PreviousReservationsComponent implements OnInit{

  constructor(
    private requestService: BlReservationsRequestsService,
    private matDialog: MatDialog
  ) {}

  public reservations: IReservation[];
  public imgPath = config.apiUrl + "/apartments/mainImages/"
  public disabledButtons: { [key: number]: boolean } = {};

  ngOnInit(): void {
      this.getAllReservations();
  }

  getAllReservations() {
    Spinner.show();
    this.requestService.getAll().subscribe({
      next: (data) => {
        Spinner.hide();
        this.reservations = data.data;
        this.reservations.forEach(reservation => {
          this.disabledButtons[reservation.bookingId] = this.disableCancelationButton(reservation.bookingId);
        });
      },
      error: (err) => {
        Spinner.hide();
        console.log(err);
        
      }
    })

    
  }

  disableCancelationButton(bookingId: number): boolean {
    const booking = this.reservations.find(x => x.bookingId === bookingId);
    if (!booking) return true;
    const today = new Date().toISOString().split('T')[0];
    return new Date(booking.checkIn) <= new Date(today);
  }

  cancel(bookingId: number): void {    
    const dialogRef = this.matDialog.open(SimpleConfirmationDialogComponent,{
      width: "300px",
      data: {
        title: "Confirm Cancellation",
        message: "Are you sure you want to cancel this booking?"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.requestService.deleteBooknig(bookingId).subscribe({
          next: success => {
            this.getAllReservations();
            console.log("OBRISANO");
          }
        })
        
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
