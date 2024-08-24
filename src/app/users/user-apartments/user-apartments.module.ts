import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserApartmentsRoutingModule } from './user-apartments-routing.module';
import { UserApartmentsComponent } from './components/user-apartments/user-apartments.component';
import { SharedModule } from '../../shared/shared.module';
import { AddApartmentComponent } from './components/add-apartment/add-apartment.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  declarations: [
    UserApartmentsComponent,
    AddApartmentComponent,
  ],
  imports: [
    CommonModule,
    UserApartmentsRoutingModule,
    SharedModule,
    NgxDropzoneModule
  ],
  exports: [
    UserApartmentsComponent
  ]
})
export class UserApartmentsModule { }
