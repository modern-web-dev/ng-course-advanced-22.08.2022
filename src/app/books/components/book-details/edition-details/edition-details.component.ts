import {Component, Input} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edition-details',
  templateUrl: './edition-details.component.html',
  styleUrls: ['./edition-details.component.scss']
})
export class EditionDetailsComponent {

  readonly formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      publisher: new FormControl(),
      publishYear: new FormControl(),
      editionNumber: new FormControl()
    });
  }
}
