import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApartmentDetailFormComponent } from '../apartment-form/apartment-detail-form.component';
import { Router } from '@angular/router';
import { IApartment } from '../../../interfaces/i-apartments';
import { SearchService } from '../../../services/search-service.service';
import { ISearch } from '../../../interfaces/i-search';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../../../shared/buisiness-logic/auth.service';
import { IBookingForm } from '../../../../booking/components/interfaces/i-booking';
import { BlBookingDataService } from '../../../../booking/components/services/bl-booking-data.service';

@Component({
  selector: 'app-apartment-booking',
  templateUrl: './apartment-booking.component.html',
  styleUrl: './apartment-booking.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ApartmentBookingComponent implements OnInit {

  constructor(
    private router: Router,
    private searchService: SearchService,
    public authService: AuthService,
    private bookingDataService: BlBookingDataService
  ) { }

  @Input() apartment: IApartment

  searched: ISearch;
  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));

  totalGuests: number[] = [];
  totalPrice: number = 0;
  totalNights: number | null = null;

  
  form = new FormGroup({
    start: new FormControl<Date>(null, Validators.required),
    end: new FormControl<Date>(null, Validators.required),
    guests: new FormControl<number>(1),
  })

  public reservationIsDisabled = !this.authService.isLoggedIn;



  ngOnInit(): void {
    this.searched = this.searchService.getData;
    console.log(!this.authService.isLoggedIn);
    
    for(let i = 1; i <= this.apartment.maxGuests; i++){
      this.totalGuests.push(i);
    }
      
    if(this.searchService.getData){
      this.fillForm(this.searchService.getData)
    }
    
  }

  navigateToBookingForm(): void {
    let bookingData: IBookingForm = {
      pricePerNight: this.apartment.pricePerNight,
      totalPrice: this.totalPrice,
      checkIn: this.form.get('start').value,
      checkOut: this.form.get('end').value,
      guests: this.form.get('guests').value
    };

    this.bookingDataService.setBookingFormData(bookingData);

    this.router.navigate(['booking/form'])
  }

  calculateTotalPrice(): void {
    this.calculateTotalNights();
    this.totalPrice = this.totalNights * this.apartment.pricePerNight

  }


  calculateTotalNights() {
    const startDate = this.form.value.start
    const endDate = this.form.value.end

    if (startDate !== null && endDate !== null) {
      const dateDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
      this.totalNights = dateDifference / (1000 * 60 * 60 * 24);
    }  
  }

  fillForm(data: ISearch): void {
    this.form.get('start').setValue(new Date(data.checkIn))
    this.form.get('end').setValue(new Date(data.checkOut))
    this.form.get('guests').setValue(Number(data.guests))
    this.calculateTotalPrice();
  }

}
