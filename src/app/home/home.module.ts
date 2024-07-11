import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { HeadComponent } from './components/head/head.component';
import { TopRatedApartments } from './components/top-rated-apartments/top-rated-apartments.component';
import { TrendingDestinationsComponent } from './components/trending-destination/trending-destinations.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeadComponent,
    TopRatedApartments,
    TrendingDestinationsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }
