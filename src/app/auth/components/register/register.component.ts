import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/buisiness-logic/auth.service';
import { Router } from '@angular/router';
import { IRegister } from '../../interfaces/i-auth';
import { RegisterRequestService } from '../../services/requests/register-request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private requestService: RegisterRequestService,
    private authService: AuthService,
    private router: Router,
  ){}

  data: IRegister = {email:'', password: '', firstName: '', lastName:'', avatar:'', phone:''};
  showPassword: boolean = false;
  serverError: boolean = false;
  validationErrors: { property: string, error: string }[] = [];



  form: FormGroup = new FormGroup({
    email: new FormControl("test1@gmail.com", [Validators.required, Validators.email]),
    password: new FormControl("Ilija123!", Validators.required),
    firstName: new FormControl("Ilija", Validators.required),
    lastName: new FormControl("Antanasijevic", Validators.required),
    avatar: new FormControl(null),
    phone: new FormControl("12343223", Validators.required)
  })



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    this.prepareObjectData()
    this.requestService.register(this.data).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl("auth/login");
      },
      error: (err) => {
        if(err.status === 422){
          this.showValidationErrors(err.error)
        }else {
          this.serverError = true;
        }
        console.log(err);
      }
    })
  }

  prepareObjectData(){
    this.data.email = this.form.value.email;
    this.data.password = this.form.value.password;
    this.data.firstName = this.form.value.firstName;
    this.data.lastName = this.form.value.lastName;
    //this.data.avatar = null;
    this.data.avatar = this.form.value.avatar;
    this.data.phone = this.form.value.phone;
  }

  showValidationErrors(errors: { property: string, error: string }[]){
    this.validationErrors = errors;
    errors.forEach(err => {
      const control = this.form.get(err.property.toLowerCase());
      console.log(control);
      console.log(err);
      
      if (control) {
        control.setErrors({ validationError: err.error });
      }
    });
    
  }


 
}
