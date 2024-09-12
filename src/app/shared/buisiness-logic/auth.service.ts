import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router
  ) { }

  getJwtToken(): string {
    return localStorage.getItem("token");
  }

  getJwtTokenData(): any {
    let token = this.getJwtToken();
    let jwtHelper = new JwtHelperService();
    return jwtHelper.decodeToken(token);
  }

  setJwtToken(token: string): void {
    localStorage.setItem("token", token);
  }

   get isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  getUserId(): number {
    let jwtData = this.getJwtTokenData();    
    return jwtData.Id;
  }

  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.router.navigateByUrl("/auth/login");
  }
 
}
