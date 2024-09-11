import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingFormComponent } from './components/booking-form/booking-form.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';


@NgModule({
  declarations: [
    BookingFormComponent,
    BookingConfirmationComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
