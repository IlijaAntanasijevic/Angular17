import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/buisiness-logic/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { IUser } from '../../../../../interfaces/i-base';
import { BlUsersService } from '../../../../../users/services/shared/bl-users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: BlUsersService
  ){}
 
  isLoggedIn: boolean = false;
  user: IUser;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.user = this.userService.getUserFromLocalStorage();
    console.log(this.user);
    
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd){
        
        this.isLoggedIn = this.authService.isLoggedIn;
        //this.user = this.userService.getUserFromLocalStorage();
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
