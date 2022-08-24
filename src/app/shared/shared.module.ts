import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgPipe } from './pipes/error-msg.pipe';
import { InputComponent } from './components/input/input.component';



@NgModule({
  declarations: [
    ErrorMsgPipe,
    InputComponent
  ],
  exports: [
    ErrorMsgPipe,
    InputComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
