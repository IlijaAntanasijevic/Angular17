import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../../../shared/buisiness-logic/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { BlUsersService } from '../../../../../users/profile/services/shared/bl-users.service';
import { IUser } from '../../../../../users/profile/interfaces/i-user';

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
  ) { }

  isLoggedIn: boolean = false;
  user: IUser;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    this.user = this.userService.getUserFromLocalStorage();
    
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd){        
        this.user = this.userService.getUserFromLocalStorage();
        this.isLoggedIn = this.authService.isLoggedIn;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }

}
