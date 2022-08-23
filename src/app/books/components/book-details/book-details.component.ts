import {
  AfterViewInit,
  Component,
  EventEmitter, Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  SimpleChanges,
} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {errorToMessage} from "../../../shared/util/error-util";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  @Input()
  selectedBook!: Book;

  @Output()
  saveClicked = new EventEmitter<Book>();

  @Output()
  cancelClicked = new EventEmitter<void>();

  formGroup: FormGroup;

  constructor() {
    console.log('BookDetailsComponent constructor');
    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.maxLength(1000)])
    });
  }

  ngOnInit(): void {
    console.log('BookDetailsComponent ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('BookDetailsComponent ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('BookDetailsComponent ngOnChanges');
    console.log(JSON.stringify(changes));
    if(changes.selectedBook) {
        this.formGroup.reset(this.selectedBook);
    }
  }

  ngAfterViewInit(): void {
    console.log('BookDetailsComponent ngAfterViewInit');
  }

  save(): void {
    this.saveClicked.emit(this.formGroup.value);
  }

  cancel(): void {
    this.cancelClicked.emit();
  }

  dumpErrors(errors: ValidationErrors | null): string {
    if (errors) {
      const errorKeys = Object.keys(errors);
      return errorKeys.map(errorKey => errorToMessage(errorKey, errors[errorKey])).join(',');
    } else {
      return '';
    }
  }
}
