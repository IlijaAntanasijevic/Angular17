import { Injectable } from '@angular/core';
import { UsersApiService } from '../api/users-api.service';
import { Observable } from 'rxjs';
import { IUser } from '../../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class BlUsersRequestsService {

  constructor(
    private apiService: UsersApiService,
  ) { }

  getUserInfo(userId: number): Observable<IUser> {
    return this.apiService.get(userId);
  }
}
