import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edition-details',
  templateUrl: './edition-details.component.html',
  styleUrls: ['./edition-details.component.scss']
})
export class EditionDetailsComponent implements OnInit {

  @Input()
  formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
