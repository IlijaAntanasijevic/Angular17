import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/buisiness-logic/auth.service';
import { Router } from '@angular/router';
import { IRegister } from '../../interfaces/i-auth';
import { RegisterRequestService } from '../../services/requests/register-request.service';
import { BlUsersRequestsService } from '../../../users/profile/services/requests/bl-users-requests.service';
import { config } from '../../../config/global';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(
    private requestService: RegisterRequestService,
    private userService: BlUsersRequestsService,
    private router: Router,
  ) {}

  data: IRegister = {email:'', password: '', firstName: '', lastName:'', avatar:'', phone:''};
  showPassword: boolean = false;
  serverError: boolean = false;
  validationErrors: { property: string, error: string }[] = [];
  selectedAvatar: string = "";

  public imgUrl = config.apiUrl + "temp/";



  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", Validators.required),
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    avatar: new FormControl(null),
    phone: new FormControl("", Validators.required)
  })

  selectedFile: File | null = null;



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
         }
         else {
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
    this.data.phone = this.form.value.phone.toString();
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

  fileUpload(event: any): void {
    const file: File = event.target.files[0];
    this.userService.avatarUpload(file).subscribe({
      next: (data) => {
        this.data.avatar = data.file;
        this.selectedAvatar = data.file;
      },
      error: (err) => {
        this.serverError = true;
      }

    })
  }


 
}
