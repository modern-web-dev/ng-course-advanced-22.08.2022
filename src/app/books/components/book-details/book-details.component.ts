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
import {EditionDetailsForm} from "./edition-details/edition-details.form";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input()
  book: Book | undefined | null;

  @Input()
  foo: string | undefined;

  @Output()
  bookSaved = new EventEmitter<Book>();

  @Output()
  editingCancelled = new EventEmitter<void>();

  private editionDetailsForm!: EditionDetailsForm;

  @ViewChild(EditionDetailsComponent, { static: true })
  set editionDetailsComponent(component: EditionDetailsComponent) {
    this.editionDetailsForm = component.form;
    this.formGroup.addControl('edition', component.form.formGroup);
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
      this.formGroup.reset(this.book);
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
    const book:Book = {
      id: this.formGroup.controls['id'].value,
      title: this.formGroup.controls['title'].value,
      author: this.formGroup.controls['author'].value,
      description: this.formGroup.controls['description'].value,
      edition: this.editionDetailsForm.extract()
    }
    this.bookSaved.emit(book);
  }
}
