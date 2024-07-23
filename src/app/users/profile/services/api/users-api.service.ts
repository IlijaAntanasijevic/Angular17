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
    return this.http.get<IUser>(config.apiUrl + "api/users/" + id);
  }

  update(id: number, userData: IUserRequest): Observable<any> {
    return this.http.put(config.apiUrl + "api/users/" + id, userData);
  }

  uploadAvatar(file: File): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name)

    return this.http.post(config.apiUrl + "api/files", formData)
  }
}
