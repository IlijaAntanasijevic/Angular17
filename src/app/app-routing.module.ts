import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children:[
      {
        path: "",
        pathMatch: "full",
        redirectTo: "home"
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: "apartments",
        loadChildren: () => import('./apartments/apartments.module').then(m => m.ApartmentsModule)
      },
      {
        path: "auth",
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: "profile",
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        canActivate: [AuthGuard]
      },
      {
        path: "booking",
        loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule)
      },
      {
        path: "**",
        component: NotFoundComponent
      }
    ]
  },
  {
    path: "**",
    component: NotFoundComponent
  }

];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {
  //   scrollPositionRestoration: 'top'
  // })],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
