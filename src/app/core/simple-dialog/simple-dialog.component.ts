import {  Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-dialog',
  templateUrl: './simple-dialog.component.html',
  styleUrl: './simple-dialog.component.css',

})
export class SimpleDialogComponent {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) {}

}
