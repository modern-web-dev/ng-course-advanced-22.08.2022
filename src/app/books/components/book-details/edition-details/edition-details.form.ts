import {FormControl, FormGroup} from "@angular/forms";
import {Edition} from "../../../model/edition";

export class EditionDetailsForm {

  readonly formGroup = new FormGroup({
    publisher: new FormControl(),
    publishYear: new FormControl(), /* number */
    editionNumber: new FormControl() /* number */
  });

  feed(edition: Edition): void {
    this.formGroup.reset(edition);
  }

  extract(): Edition {
    return {
      publisher: this.formGroup.controls.publisher.value,
      publishYear: Number.parseInt(this.formGroup.controls.publishYear.value),
      editionNumber: Number.parseInt(this.formGroup.controls.editionNumber.value)
    }
  }
}
