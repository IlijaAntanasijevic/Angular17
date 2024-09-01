import { Injectable } from '@angular/core';
import { ReservationsService } from '../api/reservations.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlReservationsRequestsService {

  constructor(
    private apiService: ReservationsService
  ) { }

  getAll(): Observable<any> {
    return this.apiService.getAll();
  }

  deleteBooknig(id: number): Observable<any> {
    return this.apiService.deleteBooknig(id);
  }
}
