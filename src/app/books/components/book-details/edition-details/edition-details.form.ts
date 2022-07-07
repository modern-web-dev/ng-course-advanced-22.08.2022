import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Edition} from "../../../model/edition";

export class EditionDetailsForm {
  readonly formGroup = new FormGroup({
    publisher: new FormControl(''),
    publishYear: new FormControl('', [Validators.min(1900), Validators.max(2030)]),
    editionNumber: new FormControl('', [Validators.min(1), Validators.max(100)])
  });

  feed(edition: Edition): void {
    this.formGroup.setValue(edition);
  }

  extract(): Edition {
    const edition = this.formGroup.value;
    return {
      publisher: edition.publisher,
      publishYear: Number.parseInt(edition.publishYear),
      editionNumber: Number.parseInt(edition.editionNumber)
    }
  }
}
