import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  readonly formGroup: FormGroup;

  // Option 2 (preferrable)
  @Input()
  book: Book | undefined;

  @Input()
  foo: string | undefined;

  // Option 1 (use with care!)
  // private _book: Book | undefined;
  //
  // @Input()
  // set book(value: Book | undefined) {
  //   console.log('book changed');
  //   this._book = value;
  //   if(this._book) {
  //     this.formGroup.setValue(this._book);
  //   }
  // }
  // get book(): Book | undefined {
  //   return this._book;
  // }

  @Output()
  bookSaved = new EventEmitter<Book>();

  @Output()
  editingCancelled = new EventEmitter<void>();

  constructor() {
    console.log("BookDetailsComponent is constructed");
    console.log(this.book);
    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', Validators.maxLength(1000)),
      edition: new FormGroup({
        publisher: new FormControl(''),
        publishYear: new FormControl('', [Validators.min(1900), Validators.max(2030)]),
        editionNumber: new FormControl('', [Validators.min(1), Validators.max(100)])
      })
    });
  }

  ngOnInit(): void {
    console.log("BookDetailsComponent ngOnInit");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("BookDetailsComponent ngOnChanges");
    if(this.book && changes['book']) {
      this.formGroup.setValue(this.book);
    }
  }

  ngAfterViewInit(): void {
    console.log("BookDetailsComponent ngAfterViewInit");
  }

  ngOnDestroy(): void {
    console.log("BookDetailsComponent ngOnDestroy");
  }

  toggleDisable(): void {
    const fc = this.formGroup;
    if(fc.disabled) {
      fc.enable();
    } else {
      fc.disable();
    }
  }

  saveBook(): void {
    this.bookSaved.emit(this.formGroup.value);
  }
}
