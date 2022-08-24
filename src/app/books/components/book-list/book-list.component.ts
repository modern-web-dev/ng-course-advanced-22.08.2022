import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  books$: Observable<Book[]>;

  selectedBook: Book | null = null;

  constructor(private readonly bookService: BookService) {
    console.log('BookListComponent constructor');
    this.books$ = this.bookService.getBooks();
  }

  ngOnInit(): void {
    console.log('BookListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('BookListComponent ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('BookListComponent ngOnChanges');
  }

  ngAfterViewInit(): void {
    console.log('BookListComponent ngAfterViewInit');
  }

  saveBook(book: Book): void {
    this.bookService.saveBook(book).subscribe(_ => {
      this.selectedBook = null;
      this.books$ = this.bookService.getBooks();
    });
  }

  cancel(): void {
    this.selectedBook = null;
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }
}
