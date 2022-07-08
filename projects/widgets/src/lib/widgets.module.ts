import {NgModule} from '@angular/core';
import {InputComponent} from "./components/input/input.component";
import {ErrorMsgPipe} from "./pipes/error-msg.pipe";
import {CommonModule} from "@angular/common";


@NgModule({
  declarations: [
    InputComponent, ErrorMsgPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent, ErrorMsgPipe
  ]
})
export class WidgetsModule {
}
