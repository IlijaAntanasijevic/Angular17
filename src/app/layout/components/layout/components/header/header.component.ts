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
export class HeaderComponent implements OnInit, OnChanges{

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: BlUsersService
  ){}


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.user = this.userService.getUserFromLocalStorage();
  }
 
  isLoggedIn: boolean = false;
  user: IUser;
  //ngOnChanges()
  /*
Called before ngOnInit() 
(if the component has bound inputs) and whenever one or more data-bound input properties change.
  */

 //ngDoCheck() - ???
 //Called immediately after ngOnChanges(),
 //on every change detection run, and immediately after ngOnInit() on the first run


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    
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
