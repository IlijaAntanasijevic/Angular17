import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IApartment } from '../../interfaces/i-apartments';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnChanges {

  @Input() apartments: IApartment[];
  @Output() pageChange: EventEmitter<IApartment[]> = new EventEmitter<IApartment[]>();

  totalPages: number;
  currentPage: number = 1;
  perPage: number = 9;


  ngOnChanges(): void {
    if (this.apartments) {
      this.totalPages = Math.ceil(this.apartments.length / this.perPage);
    }
  }

  onPageChange(pageNumber: number): void {
    //console.log(this.currentPage);
    this.currentPage = pageNumber;
  

    const startIndex = (pageNumber - 1) * this.perPage;
    const endIndex = Math.min(startIndex + this.perPage, this.apartments.length);
    const pageApartments = this.apartments.slice(startIndex, endIndex);
    this.pageChange.emit(pageApartments);
  }

  getRange(rate: number) {
    return Array.from({length: rate}, (_, i) => i + 1);
  }

}
