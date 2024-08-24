import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AddApartmentFormService {

  constructor(private fb: FormBuilder) { }

  public form: FormGroup = this.init();

  init(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required],
      address: ["", Validators.required],
      cityCountryId: ["", Validators.required],
      cityId: [{ value: "", disabled: true }, Validators.required],
      maxGuests: ["", Validators.required],
      images: [[], Validators.required],
      countryId: ["", Validators.required],
      price: ["", [Validators.required]],
      mainImage: ["", Validators.required],
      apartmentTypeId: ["", Validators.required],
      featureIds: this.fb.array([], Validators.required),
      paymentMethodIds: [[], Validators.required],
    });
  }

  getForm(): FormGroup {
    return this.form;
  }

  get featureIds(): FormArray {
    return this.form.get('featureIds') as FormArray;
  }

}
