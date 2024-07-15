import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<IUser> {
    return this.http.get<IUser>("http://ilija-booking.somee.com/api/users/" + id);
  }
}
