import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from '../../pipes/full-name.pipe';
import { SharedModule } from '../../shared/shared.module';


//TODO - Fix view all photos / Slider??

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FullNamePipe,
    SharedModule
  ]
})
export class ApartmentDetailModule { }
