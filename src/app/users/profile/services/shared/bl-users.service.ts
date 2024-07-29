import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../../../../shared/buisiness-logic/auth.service';
import { BlUsersRequestsService } from '../requests/bl-users-requests.service';
import { IUser } from '../../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class BlUsersService {

  constructor(
    private authService: AuthService,
    private requestService: BlUsersRequestsService
    
  ) { }


  //private userSubject = new BehaviorSubject<IUser>(null);
  //public currentUserInfo = this.userSubject.asObservable();

  fetchUserInfo(): void {
    const tokenData = this.authService.getJwtTokenData();
    const userId = tokenData.Id;
    //console.log(tokenData);
    
    this.requestService.getUserInfo(userId).subscribe((user) => {
      //this.userSubject.next(user);
      //console.log(user);
      
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  getUserFromLocalStorage(): IUser {
    return JSON.parse(localStorage.getItem("user"))
  }

  getCurrentUserId(): number {
    let user = this.getUserFromLocalStorage();
    return user.id;
  }

}
