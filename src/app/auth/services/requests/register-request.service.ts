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
    data.avatar = data.avatar == "" ? null : data.avatar;
    return this.apiService.register(data);
  }

  avatarUpload(file: File): Observable<any> {
    return this.apiService.uploadAvatar(file);
  }
}
