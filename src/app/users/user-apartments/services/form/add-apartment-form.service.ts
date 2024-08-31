import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BlUserApartmentsRequestsService } from '../requests/bl-user-apartments-requests.service';
import { IAddApartmentForm } from '../interfaces/i-apartment';

@Injectable({
  providedIn: 'root'
})
export class AddApartmentFormService{

  constructor(
    private fb: FormBuilder,
    private requestService: BlUserApartmentsRequestsService
  ) { }

  public form: FormGroup = this.init();
  public id: number;
  public data: IAddApartmentForm;

  init(): FormGroup {
    return this.fb.group({
      name: ["", [Validators.required]],
      description: ["", Validators.required],
      address: ["", Validators.required],
      // cityCountryId: ["", Validators.required],
      cityId: [{ value: "", disabled: true }, Validators.required],
      maxGuests: ["", Validators.required],
      images: [[]],
      countryId: ["", Validators.required],
      price: ["", [Validators.required]],
      mainImage: [""],
      apartmentTypeId: ["", Validators.required],
      featureIds: this.fb.array([]),
      paymentMethodIds: [[], Validators.required],
    });
  }

  fillForm(id: number): void {
    this.requestService.getById(id).subscribe({
      next: (apartmentData: IAddApartmentForm) => {
        this.data = apartmentData;
        
        this.form.patchValue({
          name: apartmentData.name,
          description: apartmentData.description,
          address: apartmentData.address,
          // cityCountryId: apartmentData.cityCountryId,
          cityId: apartmentData.cityId,
          maxGuests: apartmentData.maxGuests,
          images: apartmentData.images,
          countryId: apartmentData.countryId,
          price: apartmentData.pricePerNight,
          mainImage: apartmentData.mainImage,
          apartmentTypeId: apartmentData.apartmentTypeId,
          paymentMethodIds: apartmentData.paymentMethodIds,
        });       
          
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  get featureIds(): FormArray {
    return this.form.get('featureIds') as FormArray;
  }

  reset(): void {
    this.form.reset();
    this.id = null;
    this.data = null;
  }

}
