import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBookingForm } from '../../../interfaces/i-booking';
import { SearchService} from '../../../services/search-service.service';

@Component({
  selector: 'app-apartment-detail-form',
  templateUrl: './apartment-detail-form.component.html',
  styleUrl: './apartment-detail-form.component.css'
})
export class ApartmentDetailFormComponent implements OnInit {

  isBookingSuccessful: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<ApartmentDetailFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBookingForm

  ){}


  ngOnInit(): void {
   console.log(this.data);
   
  }

  form: any = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    phone: new FormControl("", [Validators.required, Validators.pattern(/^\d{6,13}$/)])
  });


  save(): void {
    this.isBookingSuccessful = true;
    setTimeout(() => {
      this.close(true);
    },2000)
  }

  close(state: boolean = false): void {
    this.dialogRef.close(state);
  }


 

}
