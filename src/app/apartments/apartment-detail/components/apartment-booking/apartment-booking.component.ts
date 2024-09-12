import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApartmentDetailFormComponent } from '../apartment-form/apartment-detail-form.component';
import { Router } from '@angular/router';
import { IApartment, IApartmentDetail } from '../../../interfaces/i-apartments';
import { SearchService } from '../../../services/search-service.service';
import { ISearch } from '../../../interfaces/i-search';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthService } from '../../../../shared/buisiness-logic/auth.service';
import { IBooking, IBookingForm } from '../../../../booking/components/interfaces/i-booking';
import { BlBookingDataService } from '../../../../booking/components/services/bl-booking-data.service';
import { DateHelpers } from '../../../../helpers/utility';

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

  @Input() apartment: IApartmentDetail

  searched: ISearch;
  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));

  totalGuests: number[] = [];
  totalPrice: number = 0;
  totalNights: number | null = null;

  public paymentMethodsObj: { id: number, title: string }[] = [];

  
  form = new FormGroup({
    start: new FormControl<Date>(null, Validators.required),
    end: new FormControl<Date>(null, Validators.required),
    guests: new FormControl<number>(1),
    paymentId: new FormControl<number>(null, Validators.required)
  })

  public reservationIsDisabled = !this.authService.isLoggedIn;

  ngOnInit(): void {
    this.searched = this.searchService.getData;    
    
    this.createPaymentMethodObject(this.apartment.paymentMethodIds, this.apartment.paymentMethods);
    
    for(let i = 1; i <= this.apartment.maxGuests; i++){
      this.totalGuests.push(i);
    }
      
    if(this.searchService.getData){
      this.fillForm(this.searchService.getData)
    }
    
  }

  createPaymentMethodObject(paymentIds: number[], paymentNames: string[]): void {
    this.paymentMethodsObj = paymentIds.map((id, index) => ({
      id: id,
      title: paymentNames[index]
    }));    
  }

  calculateTotalPrice(): void {
    const startDate = this.form.value.start
    const endDate = this.form.value.end
    this.totalNights = DateHelpers.calculateTotalNights(startDate, endDate)

    this.totalPrice = this.totalNights * this.apartment.pricePerNight

  }

  fillForm(data: ISearch): void {
    this.form.get('start').setValue(new Date(data.checkIn))
    this.form.get('end').setValue(new Date(data.checkOut))
    this.form.get('guests').setValue(Number(data.guests))
    this.calculateTotalPrice();
  }


  navigateToBookingForm(): void {
    let paymentId = this.form.get('paymentId').value;
    let bookingData: IBooking = {
      apartmentId: this.apartment.id,
      pricePerNight: this.apartment.pricePerNight,
      totalPrice: this.totalPrice,
      checkIn: this.form.get('start').value,
      checkOut: this.form.get('end').value,
      totalGuests: this.form.get('guests').value,
      paymentId: paymentId,
      paymentTitle: this.paymentMethodsObj.find(x => x.id == paymentId).title
    };

    this.bookingDataService.setBookingFormData(bookingData);

    this.router.navigate(['booking/form'])
  }

}
