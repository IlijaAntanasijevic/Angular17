import { Component } from '@angular/core';
import { AddApartmentFormService } from '../../services/form/add-apartment-form.service';

@Component({
  selector: 'app-add-apartment',
  templateUrl: './add-apartment.component.html',
  styleUrl: './add-apartment.component.css'
})
export class AddApartmentComponent {

  constructor(
    private formService: AddApartmentFormService
  ){}
  public form = this.formService.getForm();

  ngOnInit(): void {
    
  }
}
