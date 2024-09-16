import { Component, OnDestroy, OnInit } from '@angular/core';
import { BlUsersService } from '../../services/shared/bl-users.service';
import { BlProfileFormService } from '../../services/form/bl-profile-form.service';
import { BlUsersRequestsService } from '../../services/requests/bl-users-requests.service';
import { IUser } from '../../interfaces/i-user';
import { config } from '../../../../config/global';
import { Spinner } from '../../../../shared/functions/spinner';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent implements OnInit, OnDestroy{

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
    Spinner.show();
    this.user = this.userService.getUserFromLocalStorage();
    this.formService.fillForm(this.user);
    Spinner.hide();
  }

  uploadAvatar(event: Event) {
    const input = event.target as HTMLInputElement;
    const file: File = input.files[0]
    if (input.files && input.files.length > 0) {
    this.userRequestService.avatarUpload(file).subscribe({
      next: (data) => {
        this.form.patchValue({ avatar: data.file });
        this.user.avatar = data.file;
        this.imgPath = config.apiUrl + "temp/";
        this.avatarChanged = true;
        
      },
      error: (err) => {
       console.log(err); 
       this.serverError = err.error.message ?? "Server error, please try again later.";

      }

    })
  }
  }

  submit(): void {    
    Spinner.show();
    this.serverError = "";
    this.success = false;

  if(!this.form.invalid) {    
    this.formService.submit(this.user.id).subscribe({
      next: () => {
        this.userService.fetchUserInfo(false);
          new Promise(() => {
            this.userService.getUserFromLocalStorage()
          }).then((data) => {
            this.user = data as IUser;
        
          })
          this.success = true;
          this.imgPath = config.apiUrl + "users/";
          this.avatarChanged = false;
          Spinner.hide();
      },
      error: (err) => {
        Spinner.hide();
        console.log(err);
        err.error.forEach((error: any) => {
          const propertyName = error.property;
          const errorMessage = error.error;
          this.serverError += `${propertyName}: ${errorMessage}\n`;
        });
        
        //this.serverError = err.error.message;
        this.success = false;        
      }
    })
  }
  }


  ngOnDestroy(): void {
    this.formService.reset()
  }

}
