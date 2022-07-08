import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMsgPipe } from './pipes/error-msg.pipe';
import { InputComponent } from './components/input/input.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";



@NgModule({
  declarations: [
    ErrorMsgPipe,
    InputComponent
  ],
  exports: [
    ErrorMsgPipe, InputComponent
  ],
  imports: [
    CommonModule, HttpClientModule
  ]
})
export class SharedModule { }
