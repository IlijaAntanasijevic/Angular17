import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BlBookingRequestsService } from '../services/requests/bl-booking-requests.service';
import { IUser } from '../../../users/profile/interfaces/i-user';
import { Subscription } from 'rxjs';
import { Spinner } from '../../../shared/functions/spinner';
import { DialogHelper } from '../../../helpers/utility';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css'
})
export class BookingConfirmationComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {isSuccess: boolean, apartmentId: number},
    private requestsService: BlBookingRequestsService,
    private matDialog: MatDialog

  ) { }

  public apartmentOwner: IUser = null;
  private subscription: Subscription = new Subscription();
  
  ngOnInit(): void {
    if(this.data.isSuccess) {
      this.getApartmentOwnerInfo()
    }
  }


  getApartmentOwnerInfo(): void {
    Spinner.show();

    this.subscription.add(
      this.requestsService.getApartmentData(this.data.apartmentId).subscribe({
        next: (data) => {
          console.log(data);
          this.apartmentOwner = data.user;
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
          DialogHelper.openErrorDialog(this.matDialog, "Server error");
        }
      })
    )
  }
}
