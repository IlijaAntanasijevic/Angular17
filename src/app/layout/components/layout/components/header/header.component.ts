import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../shared/buisiness-logic/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private router: Router
  ){}
 
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn;
    console.log(this.isLoggedIn);
    
    this.router.events.forEach((event) => {
      if(event instanceof NavigationEnd){
        this.isLoggedIn = this.authService.isLoggedIn;
      }
    });

  }

  logout(): void {
    this.authService.logout();
  }


}
