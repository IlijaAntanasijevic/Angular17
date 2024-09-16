import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { AuthService } from '../../../../shared/buisiness-logic/auth.service';
import { BlUsersRequestsService } from '../requests/bl-users-requests.service';
import { IUser } from '../../interfaces/i-user';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BlUsersService {

  constructor(
    private authService: AuthService,
    private requestService: BlUsersRequestsService,
    private router: Router
    
  ) { }


  fetchUserInfo(redirect: boolean = true): void {
    const tokenData = this.authService.getJwtTokenData();
    const userId = tokenData.Id;
    
    this.requestService.getUserInfo(userId).subscribe((user) => {      
      localStorage.setItem('user', JSON.stringify(user));
      if(redirect) {
        this.router.navigateByUrl("/apartments")
      }

    });
  }

  getUserFromLocalStorage(): IUser {
    return JSON.parse(localStorage.getItem("user"))
  }

  getCurrentUserId(): number {
    let user = this.getUserFromLocalStorage();
    return user.id;
  }


  getUserApartments(): any {
    
  }

  fetchUserInfoObservable(): Observable<IUser> {
    const tokenData = this.authService.getJwtTokenData();
    const userId = tokenData.Id;

    return this.requestService.getUserInfo(userId).pipe(
      map((user: IUser) => {
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      })
    );
  }

}
