import {Component, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  innerValue = '';

  @Input()
  inputId = '';

  @Input()
  label = '';

  onChangeCallback: (value: any) => void = (_: string) => {};

  constructor() { }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {

  }

  writeValue(value: string): void {
    this.innerValue = value;
  }

  onInput($event: Event) {
    console.log($event);
  }
}
