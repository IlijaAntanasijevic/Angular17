import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserApartmentsRoutingModule } from './user-apartments-routing.module';
import { UserApartmentsComponent } from './components/user-apartments/user-apartments.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    UserApartmentsComponent,
  ],
  imports: [
    CommonModule,
    UserApartmentsRoutingModule,
    SharedModule
  ],
  exports: [
    UserApartmentsComponent
  ]
})
export class UserApartmentsModule { }
