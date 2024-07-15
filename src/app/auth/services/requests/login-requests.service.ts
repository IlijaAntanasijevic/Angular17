import { Injectable } from '@angular/core';
import { AuthApiService } from '../api/auth-api.service';
import { ILogin, IAuthToken } from '../../interfaces/i-auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRequestsService {

  constructor(
    private apiService: AuthApiService
  ) {}

  login(data: ILogin): Observable<IAuthToken>{
    return this.apiService.login(data);
  }

  setUser(token: IAuthToken): void {
    
  }
}
