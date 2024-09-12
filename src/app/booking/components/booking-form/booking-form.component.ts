import { Component, OnDestroy, OnInit } from '@angular/core';
import { IBooking, IBookingApartment, IBookingForm, IBookingRequest } from '../interfaces/i-booking';
import { BlBookingDataService } from '../services/bl-booking-data.service';
import { FormGroup } from '@angular/forms';
import { BlBookingFormService } from '../services/bl-booking-form.service';
import { ApartmentsRequestsService } from '../../../apartments/requests/apartments-requests.service';
import { Spinner } from '../../../shared/functions/spinner';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/buisiness-logic/auth.service';
import { IUser } from '../../../users/profile/interfaces/i-user';
import { BlBookingRequestsService } from '../services/requests/bl-booking-requests.service';
import { IApartmentDetail } from '../../../apartments/interfaces/i-apartments';
import { DateHelpers, DialogHelper, ImageUtils } from '../../../helpers/utility';
import { ImagePaths } from '../../../core/consts/image-paths';
import { MatDialog } from '@angular/material/dialog';
import { BookingConfirmationComponent } from '../booking-confirmation/booking-confirmation.component';
import { SimpleDialogComponent } from '../../../core/simple-dialog/simple-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit, OnDestroy{

  constructor(
    private bookingDataService: BlBookingDataService,
    private formService: BlBookingFormService,
    private bookingRequestsService: BlBookingRequestsService,
    private matDialog: MatDialog,
    private router: Router
  ) { }

  public bookingData: IBooking = null;
  public bookingForm: IBookingForm = null;

  private subscription: Subscription = new Subscription();
  public form = this.formService.getForm();
  public apartment: IBookingApartment = null;
  public totalNights: number = null;


  ngOnInit(): void {
   this.bookingData = this.bookingDataService.getBookingData();   
   if(this.bookingData) {
    this.getAllData();
   }
   else {
    this.router.navigateByUrl('/apartments')
   }

  }


  getAllData(): void {
    Spinner.show();
    this.subscription.add(
      this.bookingRequestsService.getAllData(this.bookingData.apartmentId).subscribe({
        next: (data) => {
          this.getFormData(data['user'])
          this.setBookingApartmentData(data['apartment']);         
          Spinner.hide();
        },
        error: (err) => {
          DialogHelper.openErrorDialog(this.matDialog, "Server error!");
          Spinner.hide();
        }
      })
    )
  }

  getFormData(user: IUser): void {
    const formData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      pricePerNight: this.bookingData.pricePerNight,
      totalPrice: this.bookingData.totalPrice,
      checkIn: new Date(this.bookingData.checkIn),
      checkOut: new Date(this.bookingData.checkOut),
      totalGuests: this.bookingData.totalGuests,
      paymentId: this.bookingData.paymentId
    };

    this.formService.fillForm(formData);

    this.totalNights = DateHelpers.calculateTotalNights(formData.checkIn, formData.checkOut)
    
  }

  setBookingApartmentData(apartmentData: IApartmentDetail): void {
    this.apartment = {
      mainImage: ImageUtils.getImagePath(apartmentData.mainImage, ImagePaths.apartmenMainImages),
      city: apartmentData.city,
      country: apartmentData.country,
      apartmentType: apartmentData.apartmentType,
      address: apartmentData.address,
      name: apartmentData.name
    } 
  }

  confirmBooking(): void {
    Spinner.show();
    let dataToSend: IBookingRequest = {
      paymentId: this.bookingData.paymentId,
      apartmentId: this.bookingData.apartmentId,
      totalGuests: this.bookingData.totalGuests,
      checkIn: this.bookingData.checkIn,
      checkOut: this.bookingData.checkOut
    }

    this.subscription.add(
      this.formService.submit(dataToSend).subscribe({
        next: (data) => {
          Spinner.hide();
          this.matDialog.open(BookingConfirmationComponent, {
            width: '800px',
            height: "auto",
            data: {
              isSuccess: true,
              apartmentId: this.bookingData.apartmentId
            }
          }).afterClosed().subscribe({
            next: success => {
              this.router.navigateByUrl("/profile")
            }
          })
        },
        error: (err) => {
          Spinner.hide();
          if(err.status === 403) {
            let message = err.error.error; // The apartment belongs to the current user and cannot be booked.
            DialogHelper.openErrorDialog(this.matDialog, message);
          }
          else {
            DialogHelper.openErrorDialog(this.matDialog, "Server error!")
          }
          
        }
      })
    )
    
  }

  ngOnDestroy(): void {
    this.form.reset();
    this.subscription.unsubscribe();
  }

}
