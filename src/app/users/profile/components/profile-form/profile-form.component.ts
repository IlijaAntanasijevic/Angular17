import { Component, OnInit } from '@angular/core';
import { BlUsersService } from '../../services/shared/bl-users.service';
import { BlProfileFormService } from '../../services/form/bl-profile-form.service';
import { BlUsersRequestsService } from '../../services/requests/bl-users-requests.service';
import { IUser } from '../../interfaces/i-user';
import { config } from '../../../../config/global';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit{


  
  constructor(
    private userService: BlUsersService,
    private formService: BlProfileFormService,
    private userRequestService: BlUsersRequestsService
  ) {}

  public user: IUser;
  public serverError = "";
  public imgPath = config.apiUrl + "users/"
  public success: boolean = false;
  public avatarChanged: boolean = false;

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
        console.log(data);
        
        this.form.patchValue({ avatar: data.file });
        this.user.avatar = data.file;
        this.imgPath = config.apiUrl + "temp/";
        this.avatarChanged = true;
        
      },
      error: (err) => {
       console.log(err); 
      }

    })
  }
  }

  submit(): void {    
  if(!this.form.invalid) {
    console.log(this.form.value);
    
    this.formService.submit(this.user.id).subscribe({
      next: () => {
        this.userService.fetchUserInfo();
     
        setTimeout(() => {
            this.user = this.userService.getUserFromLocalStorage();
            console.log(this.user);
  
            this.success = true;
            this.imgPath = config.apiUrl + "users/";
            this.avatarChanged = false;
          }, 100); 
      },
      error: (err) => {
        this.serverError = err.error.message;
        
      }
    })
  }
  }


}
