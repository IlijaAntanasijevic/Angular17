import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/layout/components/header/header.component';
import { FooterComponent } from './components/layout/components/footer/footer.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
