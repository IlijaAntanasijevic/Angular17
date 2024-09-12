import { Injectable } from '@angular/core';
import { BlBookingRequestsService } from './requests/bl-booking-requests.service';
import { IBookingForm, IBookingRequest } from '../interfaces/i-booking';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlBookingFormService {

  constructor(
    public requestService: BlBookingRequestsService
  ) { }

  public form: FormGroup = this.init();

  init() {
    return new FormGroup({
      firstName: new FormControl<string>({value: "", disabled: true}),
      lastName: new FormControl<string>({value: "", disabled: true}),
      email: new FormControl<string>({value: "", disabled: true}),
      phone: new FormControl<string>({value: "", disabled: true}),
      pricePerNight: new FormControl<number>({value: null, disabled: true}),
      totalPrice: new FormControl<number>({value: null, disabled: true}),
      checkIn: new FormControl<Date>({value: null, disabled: true}),
      checkOut: new FormControl<Date>({value: null, disabled: true}),
      totalGuests: new FormControl<number>({value: null, disabled: true}),
    });
  }
  

  getForm(): FormGroup {
    return this.form;
  }

  setFirstName(value: string) {  
    this.form.get("firstName").setValue(value);
  }

  setLastName(value: string) {  
    this.form.get("lastName").setValue(value);
  }

  setEmail(value: string) {  
    this.form.get("email").setValue(value);
  }

  setPhone(value: string) {  
    this.form.get("phone").setValue(value);
  }

  setPricePerNight(value: number) {  
    this.form.get("pricePerNight").setValue(value);
  }
  
  setTotalPrice(value: number) {  
    this.form.get("totalPrice").setValue(value);
  }
  
  setCheckIn(value: string) {  
    this.form.get("checkIn").setValue(value);
  }
  
  setCheckOut(value: string) {  
    this.form.get("checkOut").setValue(value);
  }
  
  setGuests(value: number) {  
    this.form.get("totalGuests").setValue(value);
  }

  fillForm(formData: IBookingForm): void {    
    if(formData) {
      this.setFirstName(formData.firstName);
      this.setLastName(formData.lastName);
      this.setEmail(formData.email);
      this.setPhone(formData.phone);
      this.setPricePerNight(formData.pricePerNight);
      this.setTotalPrice(formData.totalPrice);
      this.setCheckIn(formData.checkIn.toISOString().slice(0, 10));
      this.setCheckOut(formData.checkOut.toISOString().slice(0, 10));
      this.setGuests(formData.totalGuests);
    }
  }
  



  submit(data: IBookingRequest): Observable<any> { 
    return this.requestService.submitBooking(data);
  }



  reset(): void {
    this.form.reset();
  }
}
