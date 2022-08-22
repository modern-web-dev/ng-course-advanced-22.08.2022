import {Component, OnInit, ViewChild} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookService]
})
export class BookListComponent implements OnInit {

  books: Book[] = [];

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  // constructor(@Optional() bookService: BookService | null) {
  //   if (bookService) {
  //     this.books = bookService.getBooks();
  //   }
  // }

  ngOnInit(): void {
  }

}
