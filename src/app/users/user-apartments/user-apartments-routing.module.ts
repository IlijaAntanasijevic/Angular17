import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserApartmentsComponent } from './components/user-apartments/user-apartments.component';
import { AddApartmentComponent } from './components/add-apartment/add-apartment.component';

const routes: Routes = [
  {
    path: "",
    component: UserApartmentsComponent
  },
  {
    path: "add",
    component: AddApartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserApartmentsRoutingModule { }
