import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProfileFormComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
