import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardUsersComponent } from './dashboard-users/dashboard-users.component';
import { AuthGurad } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "profile",
    component: DashboardUsersComponent,
    children: [
      {
        path: "user",
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
        canActivate: [ AuthGurad ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
