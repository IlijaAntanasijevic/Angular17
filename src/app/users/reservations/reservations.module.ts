import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { PreviousReservationsComponent } from './components/previous-reservations/previous-reservations.component';
import { DashboardReservationsComponent } from './dashboard-reservations/dashboard-reservations.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PreviousReservationsComponent,
    DashboardReservationsComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    SharedModule
  ],
  exports: [
    DashboardReservationsComponent
  ]
})
export class ReservationsModule { }
