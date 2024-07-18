import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./buisiness-logic/auth.service";


@Injectable({
  providedIn: "root"
})


export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ){}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const prepareRequest = this.prepareRequest(req);
    return next.handle(prepareRequest);
  }

  prepareRequest(req: HttpRequest<any>){
    return req.clone({
      setHeaders: {
        Authorization: "Bearer " + this.authService.getJwtToken()
      }
    })
  }

}