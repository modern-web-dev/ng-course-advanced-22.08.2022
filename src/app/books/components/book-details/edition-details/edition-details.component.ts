import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edition-details',
  templateUrl: './edition-details.component.html',
  styleUrls: ['./edition-details.component.scss']
})
export class EditionDetailsComponent {

  readonly formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      publisher: new FormControl(''),
      publishYear: new FormControl('', [Validators.min(1900), Validators.max(2030)]),
      editionNumber: new FormControl('', [Validators.min(1), Validators.max(100)])
    });
  }
}
