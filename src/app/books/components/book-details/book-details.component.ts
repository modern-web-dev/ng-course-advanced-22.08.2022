import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges, ViewChild,
} from '@angular/core';
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EditionDetailsComponent} from "./edition-details/edition-details.component";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  @Input()
  selectedBook!: Book | null;

  @Output()
  saveClicked = new EventEmitter<Book>();

  @Output()
  cancelClicked = new EventEmitter<void>();

  @ViewChild(EditionDetailsComponent, { static: true })
  set editionDetailsComponent(component: EditionDetailsComponent) {
    console.log('editionDetailComponent is injected');
    this.formGroup.addControl('edition', component.form.formGroup);
    this.edition = component;
  }

  private edition!: EditionDetailsComponent;

  readonly formGroup: FormGroup;

  constructor() {
    console.log('BookDetailsComponent constructor');

    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl({
        value: '',
        disabled: false
      }, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
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
    if (changes.selectedBook) {
      this.formGroup.reset(this.selectedBook);
    }
  }

  ngAfterViewInit(): void {
    console.log('BookDetailsComponent ngAfterViewInit');
  }

  save(): void {
    const book: Book = {
      id: Number.parseInt(this.formGroup.controls.id.value),
      title: this.formGroup.controls.title.value,
      author: this.formGroup.controls.author.value,
      description: this.formGroup.controls.description.value,
      edition: this.edition.form.extract()
    };
    this.saveClicked.emit(book);
  }

  cancel(): void {
    this.cancelClicked.emit();
  }
}
