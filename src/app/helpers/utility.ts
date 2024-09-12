import { MatDialog } from "@angular/material/dialog";
import { config } from "../config/global";
import { ImagePaths } from "../core/consts/image-paths";
import { SimpleDialogComponent } from "../core/simple-dialog/simple-dialog.component";

export class ImageUtils {
  static getImagePath(imagePath: string, basePath: ImagePaths): string {
    let tmp = imagePath.split("\\");
    let imageName = tmp[tmp.length - 1];


    //OBRISATI - OSTALO U BAZI 'TEST' ZA IMG PATH
    imageName = imageName === "test" ? "b3a4a797-8f6b-4989-9934-6b65f9ac3e2b.jpg" : imageName;
   
   
   
    return `${config.apiUrl}${basePath}/${imageName}`;
  }
}


export class DateHelpers {
  static calculateTotalNights(startDate: Date, endDate: Date) {
    const dateDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
    return dateDifference / (1000 * 60 * 60 * 24);
    
  }
}


export class DialogHelper {
  static openErrorDialog(matDialog: MatDialog, message: string): void {
    matDialog.open(SimpleDialogComponent, {
      width: '300px',
      data: { 
        title: 'Error!',
        message: message
      }
    });
  }
}