import { Injectable } from '@angular/core';
import { UsersApiService } from '../api/users-api.service';
import { Observable } from 'rxjs';
import { IUser, IUserRequest } from '../../../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class BlUsersRequestsService {

  constructor(
    private apiService: UsersApiService,
  ) { }

  getUserInfo(id: number): Observable<IUser> {
    return this.apiService.get(id);
  }

  update(id: number, data: IUserRequest): Observable<any> {
    console.log(data);
    
    return this.apiService.update(id, data);
  } 
}
