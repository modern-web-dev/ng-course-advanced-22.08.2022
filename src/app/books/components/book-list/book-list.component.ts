import {Component, ElementRef, ViewChild} from '@angular/core';
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

  @ViewChild("title")
  titleInputComponent!: ElementRef<HTMLInputElement>;
  @ViewChild("author")
  authorInputComponent!: ElementRef<HTMLInputElement>;
  @ViewChild("description")
  descriptionInputComponent!: ElementRef<HTMLTextAreaElement>;

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  saveBook(): void {
    if (this.selectedBook) {
      const updatedBook: Book = {
        id: this.selectedBook.id,
        title: this.titleInputComponent.nativeElement.value,
        author: this.authorInputComponent.nativeElement.value,
        description: this.descriptionInputComponent.nativeElement.value
      };
      this.bookService.save(updatedBook);
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }
}
