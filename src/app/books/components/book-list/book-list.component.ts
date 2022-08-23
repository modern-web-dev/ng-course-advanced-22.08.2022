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

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  books: Book[] = [];

  selectedBook: Book | null = null;

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
    console.log('BookListComponent constructor');
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
    this.bookService.saveBook(book);
    this.selectedBook = null;
    this.books = this.bookService.getBooks();
  }

  cancel(): void {
    this.selectedBook = null;
  }
}
