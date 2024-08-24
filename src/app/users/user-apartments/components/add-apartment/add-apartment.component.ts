import { afterNextRender, Component, inject, Injector, ViewChild } from '@angular/core';
import { AddApartmentFormService } from '../../services/form/add-apartment-form.service';
import { BlUserApartmentsRequestsService } from '../../services/requests/bl-user-apartments-requests.service';
import { IAddApartmentDdlData, IAddApartmentForm } from '../../services/interfaces/i-apartment';
import { FormArray, FormControl } from '@angular/forms';
import { ILocation } from '../../../../home/interfaces/i-location';
import { map, Observable, startWith } from 'rxjs';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrl: './add-apartment.component.css'
})
export class AddApartmentComponent {

  constructor(
    private formService: AddApartmentFormService,
    private requestService: BlUserApartmentsRequestsService
  ) { }

  public form = this.formService.getForm();
  filteredCountries: Observable<ILocation[]>;
  public imageUrlPreview: any;
  public uploadData: any;
  files: File[] = [];

  options: ILocation[] = [];
  public ddlData: IAddApartmentDdlData = {
    features: [],
    apartmentTypes: [],
    countries: [],
    paymentMethods: [],
    cities: []
  }

  public maxGuests: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnInit(): void {
    this.requestService.getAllData().subscribe({
      next: (data) => {
        console.log(data);
        this.ddlData.apartmentTypes = data[0];
        this.ddlData.features = data[1];
        this.ddlData.countries = data[2];
        this.ddlData.paymentMethods = data[3];

        this.options = data[2];

        this.initializeFeatureCheckboxes();
        this.initializeCountryOptions();

      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  private initializeCountryOptions(): void {
    this.filteredCountries = this.form.controls['countryId'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.filter(name as string) : this.ddlData.countries.slice();
      }),
    );
    
  }

  getCities(): void {
    let id = this.form.value.countryId;
    this.requestService.getCitiesByCountryId(id).subscribe({
      next: (data) => {
        this.ddlData.cities = data;
        this.form.controls['cityId'].enable();
      },
      error: (err) => {
        console.log(err);
        
      }
    })
  }

  initializeFeatureCheckboxes(): void {
    const featureArray = this.form.get('featureIds') as FormArray;
    this.ddlData.features.forEach(() => featureArray.push(new FormControl(false)));
  }

  onFeatureChange(event: any, featureId: number): void {
    const featureIdsArray = this.form.get('featureIds') as FormArray;
    const index = this.ddlData.features.findIndex(f => f.id === featureId);

    if (event.checked) {
      featureIdsArray.at(index).setValue(true);
    } 
    else {
      featureIdsArray.at(index).setValue(false);
    }
  }


  getSelectedFeatureIds(): number[] {
    const featureIdsArray = this.form.get('featureIds') as FormArray;
    return this.ddlData.features
      .filter((_, index) => featureIdsArray.at(index).value)
      .map(f => f.id);
  }

  private filter(name: string): ILocation[] {
    const filterValue = name.toLowerCase();
    return this.ddlData.countries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(location: ILocation): string {  
    return location && location.name ? location.name : '';
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    let oversize = false;
    const uploadData = new FormData();

    const reader = new FileReader();
    
    reader.onload = e => this.imageUrlPreview = reader.result;
    reader.readAsDataURL(file);

    console.log(file);
    console.log(reader);

    if(file.size > 1024 * 1024 * 5) {
     oversize = true; 
    }
    
    uploadData.append('document', file, file.name);
    
    if(oversize){
      console.log( "The maximum allowed image size is 5MB.")
    }
    else {
      
      this.uploadData = uploadData;

    }

    
  }

  sendDocument(): void {
    // this.requestsService.uploadDocument(this.uploadData).subscribe({
    //   next: (data) => {
    //     console.log(data);
        
    //    // SpinnerFunctions.hideSpinner();
    //   },
    //   error: (err) => {
    //     console.log(err);
        
    //     //SpinnerFunctions.showSpinner();
    //   }
    // })
  }


  save(): void {
    const formData: IAddApartmentForm = {
      ...this.form.value,
      countryId: this.form.get('countryId').value.id,
      featureIds: this.getSelectedFeatureIds()
    };

    this.requestService.submitInsert(formData).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (err) => {
        console.log(err);
        
      }
    })
    
  }


}
