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
import {FormControl, FormGroup} from "@angular/forms";

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
      title: new FormControl(),
      author: new FormControl(),
      description: new FormControl()
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
        this.formGroup.setValue(this.selectedBook);
    }
  }

  ngAfterViewInit(): void {
    console.log('BookDetailsComponent ngAfterViewInit');
  }

  save(): void {
    if (this.selectedBook) {
      // this.saveClicked.emit(this.editedBook);
    }
  }

  cancel(): void {
    this.cancelClicked.emit();
  }
}
