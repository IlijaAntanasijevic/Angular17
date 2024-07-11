import { Injectable } from '@angular/core';
import { LoginApiService } from '../api/login-api.service';
import { IAuth, IAuthToken } from '../../interfaces/i-auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestsService {

  constructor(
    private apiService: LoginApiService
  ) {}

  login(credentials: IAuth): Observable<IAuthToken>{
    return this.apiService.login(credentials);
  }
}
