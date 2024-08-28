import { Component, OnInit } from '@angular/core';
import { BlUserApartmentsRequestsService } from '../../services/requests/bl-user-apartments-requests.service';
import { BlUsersService } from '../../../profile/services/shared/bl-users.service';
import { config } from '../../../../config/global';
import { MatDialog } from '@angular/material/dialog';
import { SimpleConfirmationDialogComponent } from '../../../../core/simple-confirmation-dialog/simple-confirmation-dialog.component';
import { Router } from '@angular/router';
import { AddApartmentFormService } from '../../services/form/add-apartment-form.service';

@Component({
  selector: 'app-user-apartments',
  templateUrl: './user-apartments.component.html',
  styleUrl: './user-apartments.component.css'
})
export class UserApartmentsComponent implements OnInit{

  constructor(
    private requestService: BlUserApartmentsRequestsService,
    private formService: AddApartmentFormService,
    private userService: BlUsersService,
    private dialog: MatDialog,
    private router: Router,
  ) {}

  public apartments: any;
  public imgPath = config.apiUrl + "/apartments/mainImages/"
  userId = this.userService.getCurrentUserId();

  ngOnInit(): void {
    this.fetchUserApartments();
    
  }

  getImagePath(path: string) {
    // console.log(path);
     let tmp = path.split("\\");
     let lastElement = tmp[tmp.length - 1];
     return lastElement == "test" ? "b3a4a797-8f6b-4989-9934-6b65f9ac3e2b.jpg": lastElement;
   }

   edit(id: number): void {
    this.formService.fillForm(id);
    this.formService.id = id;
    this.router.navigateByUrl("/profile/add")
   }
   

   delete(id: number) {
    const dialogRef = this.dialog.open(SimpleConfirmationDialogComponent, {
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.requestService.delete(id).subscribe({
          next: () => {
            this.fetchUserApartments();
          }
        })
      }
    })
   }

   fetchUserApartments(){
    this.requestService.getAllUserApartments(this.userId).subscribe({
      next: (data) => {
        //console.log(data);
        this.apartments = data.data;

      },
      error: (err) => {
        console.log(err);
        
      }
    })

   }
   


}
