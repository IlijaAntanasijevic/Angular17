import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentsRoutingModule } from './apartments-routing.module';
import { ApartmentsDashboardComponent } from './components/apartments-dashboard/apartments-dashboard.component';
import { ApartmentDetailComponent } from './apartment-detail/components/apartment-view/apartment-detail.component';
import { ApartmentDetailReviewsComponent } from './apartment-detail/components/apartment-reviews/apartment-detail-reviews.component';
import { ApartmentDetailFormComponent } from './apartment-detail/components/apartment-form/apartment-detail-form.component';
import { SharedModule } from '../shared/shared.module';
import { FullNamePipe } from "../pipes/full-name.pipe";
import { PaginatorComponent } from './components/paginator/paginator.component';
import { ApartmentBookingComponent } from './apartment-detail/components/apartment-booking/apartment-booking.component';


@NgModule({
    declarations: [
        ApartmentsDashboardComponent,
        ApartmentDetailComponent,
        ApartmentDetailReviewsComponent,
        ApartmentDetailFormComponent,
        ApartmentBookingComponent,
        PaginatorComponent
    ],
    imports: [
        CommonModule,
        ApartmentsRoutingModule,
        SharedModule,
        FullNamePipe
    ]
})
export class ApartmentsModule { }
