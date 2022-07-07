import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges, ViewChild
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Book} from "../../model/book";
import {EditionDetailsComponent} from "./edition-details/edition-details.component";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input()
  book: Book | undefined;

  @Input()
  foo: string | undefined;

  @Output()
  bookSaved = new EventEmitter<Book>();

  @Output()
  editingCancelled = new EventEmitter<void>();

  @ViewChild(EditionDetailsComponent, { static: true })
  set editionDetailsComponent(component: EditionDetailsComponent) {
    this.formGroup.addControl('edition', component.formGroup);
  }

  readonly formGroup: FormGroup;

  constructor() {
    console.log("BookDetailsComponent is constructed");

    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', Validators.maxLength(1000))
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
