import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequestsService } from '../../services/requests/login-requests.service';
import { ICredentials } from '../../interfaces/i-auth';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private requestService: LoginRequestsService,
    private authService: AuthService
  ){}

  showPassword: boolean = false;
  data: ICredentials = { email: '', password: '' };
  wrongCredentials: boolean = false;
  serverError: boolean = false;

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
        this.authService.setJwtToken(data.token)
        
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
