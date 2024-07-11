import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICredentials, IAuthToken } from '../../interfaces/i-auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {

  constructor(
    public http: HttpClient
  ) {}

  login(data: ICredentials): Observable<IAuthToken> {
    return this.http.post<IAuthToken>("http://ilija-booking.somee.com/api/auth",data);
  }
}
