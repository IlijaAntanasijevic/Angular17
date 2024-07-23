import { Component, OnInit } from '@angular/core';
import { BlUsersService } from '../../profile/services/shared/bl-users.service';
import { IUser } from '../../interfaces/i-user';
import { BlProfileFormService } from '../../profile/services/form/bl-profile-form.service';
import { BlUsersRequestsService } from '../../profile/services/requests/bl-users-requests.service';
import { config } from '../../../config/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
//* TODO Change password!! -> Front & Back
export class ProfileComponent implements OnInit{
  
  constructor(
    private userService: BlUsersService,
    private formService: BlProfileFormService
  ) {}

  public user: IUser;
  public serverError = "";
  public imgPath = config.apiUrl + "/users/"

  public form = this.formService.getForm();

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    this.formService.fillForm(this.user);
  }

  uploadAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log(file.name); // Handle the file here
    }

    // const file: File = event.target.files[0];
    // this.requestService.avatarUpload(file).subscribe({
    //   next: (data) => {
    //     this.data.avatar = data.file;
    //     this.selectedAvatar = data.file;
    //   },
    //   error: (err) => {
    //     this.serverError = true;
    //   }

    // })
  }

  submit(): void {    
  if(!this.form.invalid) {
    this.formService.submit(this.user.id).subscribe({
      next: (data) => {
        this.userService.fetchUserInfo();
        this.user = this.userService.getUserFromLocalStorage();
      },
      error: (err) => {
        this.serverError = err.error.message;
        console.log(err);
        
      }
    })
  }
  }


}
