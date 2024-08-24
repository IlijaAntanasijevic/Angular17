import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../buisiness-logic/auth.service";
import { BlUsersService } from "../../users/profile/services/shared/bl-users.service";
import { catchError, map, of } from "rxjs";


@Injectable({
  providedIn: "root"
})

export class AuthGuard {

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: BlUsersService,
  ){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const isLoggedIn = this.authService.isLoggedIn;

    if(!isLoggedIn){
      this.router.navigateByUrl("/auth/login")
    }
  

    // const user = this.userService.getUserFromLocalStorage();
    // if (user != null) {
    //   return this.userService.fetchUserInfoObservable().pipe(
    //     map(() => true),
    //     catchError(() => {
    //       this.router.navigate(['/auth/login']);
    //       return of(false);
    //     })
    //   );
    // }
    return isLoggedIn;
  }

  
}
