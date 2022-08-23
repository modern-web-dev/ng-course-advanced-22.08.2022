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

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  @Input()
  selectedBook!: Book;

  editedBook!: Book;

  @Output()
  saveClicked = new EventEmitter<Book>();

  @Output()
  cancelClicked = new EventEmitter<void>();

  constructor() {
    console.log('BookDetailsComponent constructor');
  }

  ngOnInit(): void {
    console.log('BookDetailsComponent ngOnInit');
    // this.editedBook = {...this.selectedBook};
  }

  ngOnDestroy(): void {
    console.log('BookDetailsComponent ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('BookDetailsComponent ngOnChanges');
    console.log(JSON.stringify(changes));
    if(changes.selectedBook) {
      this.editedBook = {...this.selectedBook};
    }
  }

  ngAfterViewInit(): void {
    console.log('BookDetailsComponent ngAfterViewInit');
  }

  save(): void {
    if (this.selectedBook) {
      this.saveClicked.emit(this.editedBook);
    }
  }

  cancel(): void {
    this.cancelClicked.emit();
  }
}
