import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IUser, IUserRequest } from '../../interfaces/i-user';
import { BlUsersRequestsService } from '../requests/bl-users-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BlProfileFormService {

  constructor(
    public requestService: BlUsersRequestsService
  ) { }

  public form: FormGroup = this.init();

  init() {
   return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      oldPassword: new FormControl(null),
      newPassword: new FormControl(null),
      firstName: new FormControl("", Validators.required),
      lastName: new FormControl("", Validators.required),
      avatar: new FormControl(null),
      phone: new FormControl("", Validators.required),
    })
  }

  getForm(): FormGroup {
    return this.form;
  }

  fillForm(user: IUser): void {    
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


  submit(id: number) { 
    let data = this.prepareDataToSend();

    return this.requestService.update(id, data);
  }

  prepareDataToSend() {
    let formValue: IUser = this.form.value;
    console.log(formValue);
    
    
    let dataToSend: IUserRequest = {
      email : formValue.email,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      phone: formValue.phone,
      oldPassword: formValue.oldPassword,
      newPassword: formValue.newPassword,
      avatar: formValue.avatar

    }

    return dataToSend;
  }

  reset(): void {
    this.form.reset();
  }
}
