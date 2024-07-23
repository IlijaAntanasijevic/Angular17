import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, IUserRequest } from '../../../interfaces/i-user';
import { config } from '../../../../config/global';


@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<IUser> {
    return this.http.get<IUser>(config.apiUrl + "/users/" + id);
  }

  update(id: number, userData: IUserRequest): Observable<any> {
    return this.http.put(config.apiUrl + "/users/" + id, userData);
  }
}
