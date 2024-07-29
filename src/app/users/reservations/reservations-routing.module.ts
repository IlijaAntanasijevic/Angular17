import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviousReservationsComponent } from './components/previous-reservations/previous-reservations.component';

const routes: Routes = [{
  path: '',
  component: PreviousReservationsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationsRoutingModule { }
