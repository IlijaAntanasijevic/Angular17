import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../buisiness-logic/auth.service";


@Injectable({
  providedIn: "root"
})

export class AuthGurad {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const isLoggedIn = this.authService.isLoggedIn;

    if(!isLoggedIn){
      this.router.navigateByUrl("/auth/login")
    }
    return isLoggedIn;
  }
}
