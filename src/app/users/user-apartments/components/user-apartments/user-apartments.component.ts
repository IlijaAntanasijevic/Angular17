import { Component, OnInit } from '@angular/core';
import { BlUserApartmentsRequestsService } from '../../services/requests/bl-user-apartments-requests.service';
import { BlUsersService } from '../../../profile/services/shared/bl-users.service';
import { config } from '../../../../config/global';

@Component({
  selector: 'app-user-apartments',
  templateUrl: './user-apartments.component.html',
  styleUrl: './user-apartments.component.css'
})
export class UserApartmentsComponent implements OnInit{

  constructor(
    private requestService: BlUserApartmentsRequestsService,
    private userService: BlUsersService
  ) {}

  public apartments: any;
  public imgPath = config.apiUrl + "/apartments/mainImages/"

  ngOnInit(): void {
    let userId = this.userService.getCurrentUserId();
    let tmp = this.requestService.getAllUserApartments(userId).subscribe({
      next: (data) => {
        console.log(data);
        this.apartments = data.data;

      },
      error: (err) => {
        console.log(err);
        
      }
    })
    
  }

  
  getImagePath(path: string) {
    // console.log(path);
     let tmp = path.split("\\");
     let lastElement = tmp[tmp.length - 1];

  
     return lastElement == "test" ? "b3a4a797-8f6b-4989-9934-6b65f9ac3e2b.jpg": lastElement;
     
     
   }


}
