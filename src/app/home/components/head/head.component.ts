import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { map, Observable, startWith } from 'rxjs';
import { ILocation } from '../../interfaces/i-location';
import { LocationsRequestsService } from '../../requests/locations-requests.service';
import { Router } from '@angular/router';
import { ISearch } from '../../../apartments/interfaces/i-search';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrl: './head.component.css',
  providers: [provideNativeDateAdapter()],
})
export class HeadComponent implements OnInit {

  constructor(
    public requestService: LocationsRequestsService,
    private router: Router
  ){}

  public totalGuests: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  options: ILocation[] = [];
  filteredOptions: Observable<ILocation[]>;
  searchObject: ISearch;

  totalNights: number | null = null;
  minDate: Date = new Date(new Date().setDate(new Date().getDate() + 1));

  form = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    guests: new FormControl(1),
    location: new FormControl<string | ILocation>('', Validators.required)
  });

  ngOnInit() {
    this.fetchData()
  }

  private initializeFilteredOptions(): void {
    this.filteredOptions = this.form.controls.location.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.name;
        return name ? this.filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(location: ILocation): string {  
    return location && location.name ? location.name : '';
  }

  private filter(name: string): ILocation[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  fetchData(): void {
    this.requestService.getAllLocations().subscribe({
      next: (data) => {
        this.options = data  
        this.initializeFilteredOptions();      
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  calculateTotalNights() {
    const startDate = this.form.value.start
    const endDate = this.form.value.end

    if (startDate !== null && endDate !== null) {
      const dateDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
      this.totalNights = dateDifference / (1000 * 60 * 60 * 24);
    }  
  }

  public search(): void {
    const location = this.form.value.location;
    //const locationId = typeof location === 'object' && location !== null ? location.id : null;
    const locationName = typeof location === 'object' && location !== null ? location.name : null;


    this.searchObject = { 
      checkIn: new Date(this.form.value.start),
      checkOut: new Date(this.form.value.end),
      location: locationName,
      guests: this.form.value.guests
    };
    
   this.router.navigate(['/apartments'], {queryParams: this.searchObject})
    
  }

}
