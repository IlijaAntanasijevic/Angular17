import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardUsersComponent } from './components/dashboard-users/dashboard-users.component';

const routes: Routes = [
  {
    path: "profile",
    component: DashboardUsersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
