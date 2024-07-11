import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: true
})
export class FullNamePipe implements PipeTransform {

  transform(review: any): string {

    if (!review) {
      return '';
    }
    return `${review.firstName} ${review.lastName}`;
  }

}
