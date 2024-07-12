import { Injectable } from '@angular/core';
import { AuthApiService } from '../api/auth-api.service';
import { IRegister } from '../../interfaces/i-auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterRequestService {

  constructor(
    private apiService: AuthApiService
  ) {}

  register(data: IRegister): Observable<any>{
    return this.apiService.register(data);
  }
}
