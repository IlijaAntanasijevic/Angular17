import { ChangeDetectionStrategy, Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-simple-confirmation-dialog',
  templateUrl: './simple-confirmation-dialog.component.html',
  styleUrl: './simple-confirmation-dialog.component.css',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleConfirmationDialogComponent implements OnInit{

  title: string;
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { title?: string, message?: string }
  ) {}

  ngOnInit(): void {
    
    this.title = this.data?.title ?? "Confirm Deletion";
    this.message = this.data?.message ?? "Are you sure you want to delete this apartment?";
  }



  readonly dialogRef = inject(MatDialogRef<SimpleConfirmationDialogComponent>);

  
  

  closeDialog(value: boolean = false): void {
    this.dialogRef.close(value);
  }

  
}
