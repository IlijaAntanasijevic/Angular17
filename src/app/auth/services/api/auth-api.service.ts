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
    return this.http.post<IAuthToken>(config.apiUrl + "/auth" ,data);
  }

  register(data: IRegister): Observable<any> {
    return this.http.post(config.apiUrl + "/users",data);
  }

  uploadAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name)

    return this.http.post(config.apiUrl + "/files", formData)
  }
}
