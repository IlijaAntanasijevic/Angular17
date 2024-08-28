import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserApartmentsRoutingModule } from './user-apartments-routing.module';
import { UserApartmentsComponent } from './components/user-apartments/user-apartments.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddEditApartmentComponent } from './components/add-edit-apartment/add-edit-apartment.component';


@NgModule({
  declarations: [
    UserApartmentsComponent,
    AddEditApartmentComponent,
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
