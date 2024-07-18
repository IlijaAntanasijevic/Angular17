import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class BlProfileFormService {

  constructor() { }

  public form: FormGroup = this.init();

  init() {
   return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      avatar: new FormControl(null),
      phone: new FormControl("", Validators.required)
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  fillForm(user: IUser): void {
    console.log(user);
    
    if(user){
      this.setFirstName(user.firstName);
      this.setLastName(user.lastName);
      this.setEmail(user.email);
      this.setPhone(user.phone);
    }
  }

  setFirstName(value: string) {  
    this.form.get("firstName").setValue(value);
  }

  setLastName(value: string) {  
    this.form.get("lastName").setValue(value);
  }

  setEmail(value: string) {  
    this.form.get("email").setValue(value);
  }

  setPhone(value: string) {  
    this.form.get("phone").setValue(value);
  }
}
