import {Component, Input, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor {

  @Input()
  label!: string;

  @Input()
  inputId!: string;

  innerValue: string = '';

  disabled = false;

  private onChangeCallback: (value: string) => void = () => {
  };
  private onTouchedCallback: () => void = () => {
  };

  constructor(@Optional() @Self() public formControl: NgControl | null) {
    if (this.formControl) {
      this.formControl.valueAccessor = this;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: string): void {
    this.innerValue = value;
  }

  valueChanged(value: string): void {
    this.innerValue = value;
    this.onChangeCallback(value);
  }

  touched(): void {
    this.onTouchedCallback();
  }
}
