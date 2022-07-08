import {Component, ElementRef, Input, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor {

  @ViewChild("editor", {static: true})
  inputElement!: ElementRef<HTMLInputElement>;

  @Input()
  inputId = '';

  @Input()
  label = '';

  @Input()
  mandatory = false;

  onChangeCallback: (value: any) => void = (_: string) => {
  };

  onTouchedCallback: () => void = () => {
  };

  constructor(@Optional() @Self() public control: NgControl) {
    if (this.control) {
      this.control.valueAccessor = this;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  writeValue(value: string): void {
    this.inputElement.nativeElement.value = value;
  }

  setDisabledState(isDisabled: boolean): void {
    this.inputElement.nativeElement.disabled = isDisabled;
  }

  onInput() {
    this.onChangeCallback(this.inputElement.nativeElement.value);
  }
}
