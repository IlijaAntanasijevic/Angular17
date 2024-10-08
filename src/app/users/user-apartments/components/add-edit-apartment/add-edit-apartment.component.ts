import {  Component, OnDestroy, OnInit } from '@angular/core';
import { AddApartmentFormService } from '../../services/form/add-apartment-form.service';
import { BlUserApartmentsRequestsService } from '../../services/requests/bl-user-apartments-requests.service';
import { IAddApartmentDdlData, IAddApartmentForm } from '../../services/interfaces/i-apartment';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ILocation } from '../../../../home/interfaces/i-location';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SimpleDialogComponent } from '../../../../core/simple-dialog/simple-dialog.component';
import { Location } from '@angular/common';
import { Spinner } from '../../../../shared/functions/spinner';

@Component({
  selector: 'app-add-edit-apartment',
  templateUrl: './add-edit-apartment.component.html',
  styleUrl: './add-edit-apartment.component.css'
})

export class AddEditApartmentComponent implements OnInit, OnDestroy {

  constructor(
    private formService: AddApartmentFormService,
    private requestService: BlUserApartmentsRequestsService,
    private matDialog: MatDialog,
    private location: Location
  ) { }


  public form = this.formService.getForm();
  public filteredCountries: Observable<ILocation[]>;
  public imageUrlPreview: any;
  public uploadData: any;
  public files: File[] = [];

  public isEdit: boolean = false;
  public images: string[] = [];
  public uploadedMainImagePath: string;

  options: ILocation[] = [];
  public ddlData: IAddApartmentDdlData = {
    features: [],
    apartmentTypes: [],
    countries: [],
    paymentMethods: [],
    cities: []
  }

  public maxGuests: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    Spinner.show();
    this.form.markAllAsTouched();
    //this.form.get("cityId").disable;

    this.subscription.add(
      this.requestService.getAllData().subscribe({
        next: (data) => {
          this.ddlData.apartmentTypes = data[0];
          this.ddlData.features = data[1];
          this.ddlData.countries = data[2];
          this.ddlData.paymentMethods = data[3];
  
          this.options = data[2];
          this.initializeFeatureCheckboxes();
          this.initializeCountryOptions();
  
          if(this.formService.id) {
            this.fillForm();
          }
      
          Spinner.hide();
        },
        error: (err) => {
          Spinner.hide();
          console.log(err); 
        }
      })
    )

  }

  fillForm(): void {
    Spinner.show();
    this.isEdit = true;
     this.subscription.add(
      this.formService.fillForm().subscribe({
        next: success => {
         this.getCities();
         this.initializeFeatureCheckboxes();
        this.initializeCountryOptions();
        Spinner.hide();
      },
      error: err => {
        Spinner.hide();
      }
    })
    )
  }

  private initializeCountryOptions(): void {
    let countryId = this.form.value.countryId;   
    if(countryId) {
      const selectedCountry = this.ddlData.countries.find((country) => country.id === countryId);

      this.form.patchValue({
        countryId: selectedCountry
      });
    
    }
    
    this.filteredCountries = this.form.controls['countryId'].valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.filter(name as string) : this.ddlData.countries.slice();
      }),
    );
    
  }

  getCities(): void {
    const cityControl = this.form.controls['cityId'];

    // cityControl.setValidators(Validators.required);
    // cityControl.updateValueAndValidity();

    let id = this.form.value.countryId.id ?? this.form.value.countryId;

    this.subscription.add(
      this.requestService.getCitiesByCountryId(id).subscribe({
        next: (data) => {
          this.ddlData.cities = data;
          cityControl.enable();
        },
        error: (err) => {
          console.log(err);
          
        }
      })
    )
  }

  initializeFeatureCheckboxes(): void {    
    const featureArray = this.form.get('featureIds') as FormArray;
    this.ddlData.features.forEach(() => featureArray.push(new FormControl(false)));    

    if(this.formService.data && this.formService.data.featuresIds){
    const selectedFeatureIds = this.formService.data.featuresIds;      
      this.ddlData.features.forEach((feature, index) => {
        if (selectedFeatureIds.includes(feature.id)) {
          featureArray.at(index).setValue(true);
        }
      });
    }
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

  displayFn(value: ILocation): string {  
    return value && value.name ? value.name : '';
  }

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }
  
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = e => this.imageUrlPreview = reader.result;
    reader.readAsDataURL(file);

    if(file.size > 1024 * 1024 * 5) {
      console.log( "The maximum allowed image size is 5MB.")
    }
    
    else {
     this.uploadImage(file, true);
    }

  }

  uploadImage(file: File, isMainImage: boolean = false): Promise<void> {
    return new Promise((resolve, reject) => {
      this.requestService.uploadMainImage(file).subscribe({
        next: (data) => {
          if (isMainImage) {
            this.uploadedMainImagePath = data.file;
          } else {
            this.images.push(data.file);
          }
          resolve();
        },
        error: (err) => {
          console.error(err);
          reject(err); 
        }
      });
    });
  }
  
  add(): void {
    Spinner.show();
    const uploadPromises = this.files.map((file) => this.uploadImage(file));
    
    Promise.all(uploadPromises)
      .then(() => {
        const formData: IAddApartmentForm = {
          ...this.form.value,
          mainImage: this.uploadedMainImagePath,
          images: this.images,
          countryId: this.form.get('countryId').value.id,
          featureIds: this.getSelectedFeatureIds()
        };
  
       if(this.isEdit){
       this.subscription.add(
        this.requestService.submitUpdate(formData, this.formService.id).subscribe({
          next: (data) => {
            Spinner.hide();
            this.matDialog.open(SimpleDialogComponent, {
              width: '300px',
              data: { 
                title: 'Successful!',
                message: 'You have successfully updated an apartment' 
              } 
            }).afterClosed().subscribe({
              next: success => {
                this.location.back();
              }
            })
          },
          error: (err) => {
            Spinner.hide();
            this.matDialog.open(SimpleDialogComponent, {
              width: '300px',
              data: { 
                title: 'ERROR!',
                message: 'Server error, please try again...' 
              } 
            }).afterClosed().subscribe({
              next: success => {
                this.location.back();
              },
            })
            console.error(err);
          }
        })
       )
       }
       else {
        this.subscription.add(
          this.requestService.submitInsert(formData).subscribe({
            next: (data) => {
              Spinner.hide();
              this.matDialog.open(SimpleDialogComponent, {
                width: '300px',
                data: { 
                  title: 'Successful!',
                  message: 'You have successfully added an apartment' 
                } 
              }).afterClosed().subscribe({
                next: success => {
                  this.location.back();
                },
              })
            },
            error: (err) => {
              Spinner.hide();
            
              console.error(err);
              
            }
          })
        )
       }
      })
      .catch((err) => {
        console.error('Error uploading images:', err);
      });
  }
  
  ngOnDestroy(): void {
    this.formService.reset();
    this.subscription.unsubscribe();
    
  }


}