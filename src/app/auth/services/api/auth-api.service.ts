import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, IAuthToken, IRegister } from '../../interfaces/i-auth';
import { map, Observable } from 'rxjs';
import { config } from '../../../config/global';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    public http: HttpClient
  ) {}

  login(data: ILogin): Observable<IAuthToken> {
    return this.http.post<IAuthToken>(config.apiUrl + "api/auth" ,data);
  }

  register(data: IRegister): Observable<any> {
    return this.http.post(config.apiUrl + "api/users",data);
  }

}
