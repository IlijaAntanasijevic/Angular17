import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddApartmentFormService {

  constructor() { }

  public form: FormGroup = this.init();

  init(): FormGroup {
   return new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      cityCountryId: new FormControl(0, Validators.required),
      price: new FormControl("", [Validators.required, Validators.min(10)]),
      mainImage: new FormControl("", Validators.required),
      apartmentTypeId: new FormControl(0, Validators.required),
      featureIds: new FormControl([], Validators.required),
      paymentMethodIds: new FormControl([], Validators.required),
      
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

}
