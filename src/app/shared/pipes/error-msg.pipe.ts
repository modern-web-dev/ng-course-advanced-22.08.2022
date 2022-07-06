import { Pipe, PipeTransform } from '@angular/core';
import {ValidationErrors} from "@angular/forms";
import {errorToMessage} from "../util/error-util";

@Pipe({
  name: 'errorMsg'
})
export class ErrorMsgPipe implements PipeTransform {

  transform(errors: ValidationErrors | null | undefined, fieldName: string): string {
    if (errors) {
      const errorKeys = Object.keys(errors);
      return errorKeys.map(errorKey => errorToMessage(errorKey, fieldName, errors[errorKey])).join(" ");
    } else {
      return "";
    }
  }
}
