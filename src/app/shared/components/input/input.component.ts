import {AfterViewInit, Component, ElementRef, Input, Optional, Self, ViewChild} from '@angular/core';
import {ControlValueAccessor, NgControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {

  @ViewChild('input', { static: true })
  inputElement: ElementRef<HTMLInputElement> | undefined;

  @Input()
  label!: string;

  @Input()
  inputId!: string;

  private preValue: string | null = null;
  private preDisabled: boolean | null = null;

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
    if(this.inputElement) {
      this.inputElement.nativeElement.disabled = isDisabled;
    } else {
      this.preDisabled = isDisabled;
    }
  }

  writeValue(value: string): void {
    if(this.inputElement) {
      this.inputElement.nativeElement.value = value;
    } else {
      this.preValue = value;
    }
  }

  valueChanged(): void {
    if(this.inputElement) {
      this.onChangeCallback(this.inputElement.nativeElement.value);
    }
  }

  touched(): void {
    this.onTouchedCallback();
  }

  ngAfterViewInit(): void {
    if(this.inputElement && this.preValue) {
      this.inputElement.nativeElement.value = this.preValue;
    }
    if(this.inputElement && this.preDisabled) {
      this.inputElement.nativeElement.disabled = this.preDisabled;
    }
  }
}
