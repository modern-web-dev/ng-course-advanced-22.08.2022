import {Component} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookService]
})
export class BookListComponent {

  books: Book[];

  selectedBook: Book | null = null;

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  selectBook(book: Book): void {
    this.selectedBook = {...book};
    // this.selectedBook = JSON.parse(JSON.stringify(book)) as Book;
  }

  saveBook(): void {
    if (this.selectedBook) {
      this.bookService.save(this.selectedBook);
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }
}
