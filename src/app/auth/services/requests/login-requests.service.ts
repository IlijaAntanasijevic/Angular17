import { Injectable } from '@angular/core';
import { LoginApiService } from '../api/login-api.service';
import { ILogin, IAuthToken } from '../../interfaces/i-auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestsService {

  constructor(
    private apiService: LoginApiService
  ) {}

  login(data: ILogin): Observable<IAuthToken>{
    return this.apiService.login(data);
  }
}
