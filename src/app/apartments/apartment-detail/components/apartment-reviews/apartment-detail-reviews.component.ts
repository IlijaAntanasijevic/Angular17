import { Component, Input } from '@angular/core';
import { IReview } from '../../../interfaces/i-reviews';

@Component({
  selector: 'app-apartment-detail-reviews',
  templateUrl: './apartment-detail-reviews.component.html',
  styleUrl: './apartment-detail-reviews.component.css'
})
export class ApartmentDetailReviewsComponent {



  @Input() reviews: IReview[];



  getRange(rate: number) {
    return Array.from({length: rate}, (_, i) => i + 1);
  }
  
}
