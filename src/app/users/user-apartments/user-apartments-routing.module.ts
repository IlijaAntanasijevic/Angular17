import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserApartmentsComponent } from './components/user-apartments/user-apartments.component';
import { AddEditApartmentComponent } from './components/add-edit-apartment/add-edit-apartment.component';

const routes: Routes = [
  {
    path: "",
    component: UserApartmentsComponent
  },
  {
    path: "add",
    component: AddEditApartmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserApartmentsRoutingModule { }
