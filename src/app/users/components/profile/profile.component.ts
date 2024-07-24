import { Component, OnInit } from '@angular/core';
import { BlUsersService } from '../../profile/services/shared/bl-users.service';
import { IUser } from '../../profile/interfaces/i-user';
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
    private formService: BlProfileFormService,
    private userRequestService: BlUsersRequestsService
  ) {}

  public user: IUser;
  public serverError = "";
  public imgPath = config.apiUrl + "/users/"
  public success: boolean = false;

  public form = this.formService.getForm();

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    this.formService.fillForm(this.user);
  }

  uploadAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const file: File = input.files[0]
    if (input.files && input.files.length > 0) {
    this.userRequestService.avatarUpload(file).subscribe({
      next: (data) => {
        this.form.value.avatar = data.file;
        
      },
      error: (err) => {
       console.log(err); 
      }

    })
  }
  }

  submit(): void {    
  if(!this.form.invalid) {
    this.formService.submit(this.user.id).subscribe({
      next: (data) => {
        this.userService.fetchUserInfo();
        this.user = this.userService.getUserFromLocalStorage();
        this.success = true;
      },
      error: (err) => {
        this.serverError = err.error.message;
        
      }
    })
  }
  }


}
