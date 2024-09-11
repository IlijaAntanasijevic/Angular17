import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IBookingForm } from '../interfaces/i-booking';
import { BlBookingDataService } from '../services/bl-booking-data.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit{

  constructor(
    private bookingDataService: BlBookingDataService
  ) { }

  bookingData: IBookingForm = null;


  ngOnInit(): void {
   this.bookingData = this.bookingDataService.getBookingData();

   console.log(this.bookingData);
   
  }
}
