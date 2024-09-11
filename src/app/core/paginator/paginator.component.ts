import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { IApartment } from '../../apartments/interfaces/i-apartments';
import { IPaginationData } from '../../apartments/interfaces/i-search';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css'
})
export class PaginatorComponent implements OnChanges {

  @Input() paginationData: IPaginationData;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  totalPages: number;
  currentPage: number = 1;
  perPage: number = 9;

  apartments: IApartment[] = [];


  ngOnChanges(): void {
    this.apartments = this.paginationData.data;
    this.totalPages = this.paginationData.pages;
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageChange.emit(pageNumber);
  }

  getRange(rate: number) {    
    return Array.from({length: rate}, (_, i) => i + 1);
  }

}
