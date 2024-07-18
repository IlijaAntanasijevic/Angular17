import { Component, OnInit } from '@angular/core';
import { BlUsersService } from '../../services/shared/bl-users.service';
import { IUser } from '../../interfaces/i-user';
import { BlProfileFormService } from '../../services/form/bl-profile-form.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  
  constructor(
    private userService: BlUsersService,
    private formService: BlProfileFormService
  ) {}

  public user: IUser;
  public apiPath = "http://ilija-booking.somee.com/users/"

  public form = this.formService.getForm();

  ngOnInit(): void {
    this.user = this.userService.getUserFromLocalStorage();
    console.log(this.user);
    this.formService.fillForm(this.user);
    
  }


}
