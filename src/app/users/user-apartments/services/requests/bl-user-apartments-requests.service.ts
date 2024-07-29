import { Injectable } from '@angular/core';
import { UserApartmentsService } from '../api/user-apartments.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlUserApartmentsRequestsService {

  constructor(
    private apiService: UserApartmentsService
  ) { }

  getAllUserApartments(userId: number): Observable<any> {
    return this.apiService.getAllUserApartments(userId);
  }
}
