import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardUsersComponent } from './dashboard-users/dashboard-users.component';
import { ProfileModule } from './profile/profile.module';


@NgModule({
  declarations: [
    DashboardUsersComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ProfileModule
  ]
})
export class UsersModule { }
