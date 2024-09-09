import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
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
  public cityId: number = null;

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

  fillForm(): Observable<any> {
    return this.requestService.getById(this.id).pipe(
      tap(data => {
        this.cityId = data.cityId;
        console.log(data);
        this.data = data;
        
  
        this.form.patchValue({
          name: data.name,
          description: data.description,
          address: data.address,
          cityId: data.cityId,
          maxGuests: data.maxGuests,
          images: data.images,
          countryId: data.countryId,
          price: data.pricePerNight,
          mainImage: data.mainImage,
          apartmentTypeId: data.apartmentTypeId,
          paymentMethodIds: data.paymentMethodIds,
        });
      })
    );
  }
  

  getForm(): FormGroup {
    return this.form;
  }

  get featureIds(): FormArray {
    return this.form.get('featureIds') as FormArray;
  }

  reset(): void {
    this.form.reset();
    this.featureIds.clear(); 
    this.form = this.init();
    this.id = null;
    this.data = null;
  }

}
