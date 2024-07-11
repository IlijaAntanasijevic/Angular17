import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApartmentDetailFormComponent } from '../apartment-form/apartment-detail-form.component';
import { Router } from '@angular/router';
import { IApartment } from '../../../interfaces/i-apartments';
import { SearchService } from '../../../services/search-service.service';
import { ISearch } from '../../../interfaces/i-search';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-apartment-booking',
  templateUrl: './apartment-booking.component.html',
  styleUrl: './apartment-booking.component.css',
  providers: [provideNativeDateAdapter()],
})
export class ApartmentBookingComponent implements OnInit {

  @Input() apartment: IApartment
  searched: ISearch
  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));

  totalGuests: number[] = [];
  totalPrice: number = 0;
  totalNights: number | null = null;
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private searchService: SearchService
  ){}

  form = new FormGroup({
    start: new FormControl<Date | null>(null, Validators.required),
    end: new FormControl<Date | null>(null, Validators.required),
    guests: new FormControl<number>(1),
  })



  ngOnInit(): void {
    this.searched = this.searchService.getData;
    //Display only the maximum number of guests per apartment
    for(let i = 1; i <= this.apartment.maxGuest; i++){
      this.totalGuests.push(i);
    }
      
    if(this.searchService.getData){
      this.fillForm(this.searchService.getData)
    }
    
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ApartmentDetailFormComponent, {
      data: {
        pricePerNight: this.apartment.price,
        totalPrice: this.totalPrice,
        checkIn: this.form.get('start').value,
        checkOut: this.form.get('end').value,
        guests: this.form.get('guests').value
      },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/apartments']);
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  calculateTotalPrice(): void {
    this.calculateTotalNights();
    this.totalPrice = this.totalNights * this.apartment.price

  }


  calculateTotalNights() {
    const startDate = this.form.value.start
    const endDate = this.form.value.end

    if (startDate !== null && endDate !== null) {
      const dateDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
      this.totalNights = dateDifference / (1000 * 60 * 60 * 24);
    }  
  }

  fillForm(data: ISearch): void {
    this.form.get('start').setValue(new Date(data.checkIn))
    this.form.get('end').setValue(new Date(data.checkOut))
    this.form.get('guests').setValue(Number(data.guests))
    this.calculateTotalPrice();
  }

}
