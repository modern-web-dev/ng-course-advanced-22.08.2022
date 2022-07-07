import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  books$: Observable<Book[]>;

  selectedBook: Book | null = null;

  constructor(private readonly bookService: BookService) {
    console.log('BookListComponent constructed');
    this.books$ = this.bookService.getBooks();
  }

  ngOnInit(): void {
    console.log('BookListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('BookListComponent ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookListComponent ngOnChanges: ${JSON.stringify(changes)}`);
  }

  ngAfterViewInit(): void {
    console.log('BookListComponent ngAfterViewInit');
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
    // this.formGroup.enable();
    // this.formGroup.reset(this.selectedBook);
  }

  saveBook(book: Book): void {
    if (this.selectedBook) {
      this.bookService.save(book).subscribe(() => {
        this.selectedBook = null;
        this.books$ = this.bookService.getBooks();
      });
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }
}
