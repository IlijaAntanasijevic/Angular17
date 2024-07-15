import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestsService } from '../../services/requests/login-requests.service';
import { ILogin } from '../../interfaces/i-auth';
import { AuthService } from '../../../shared/buisiness-logic/auth.service';
import { Router } from '@angular/router';
import { BlUsersService } from '../../../users/services/shared/bl-users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private requestService: LoginRequestsService,
    private authService: AuthService,
    private router: Router,
    private userService: BlUsersService
  ){}

  showPassword: boolean = false;
  data: ILogin = { email: '', password: '' };
  wrongCredentials: boolean = false;
  serverError: boolean = false;
  succesfullyLoggedIn: boolean = false;

  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required)
  })

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login(): void {
    this.data.email = this.form.value.email;
    this.data.password = this.form.value.password;   

    this.requestService.login(this.data).subscribe({
      next: (data) => {
        this.succesfullyLoggedIn = true;
        this.authService.setJwtToken(data.token)
        this.userService.fetchUserInfo();
        this.router.navigateByUrl("/apartments")
        
      },   
      error: (err) => {
        if(err.status === 401){
          this.wrongCredentials = true;
        }else {
          this.serverError = true;
        }
        
      }

    })
  }
}
