import {Component} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: [BookService]
})
export class BookListComponent {

  books: Book[];

  selectedBook: Book | null = null;

  readonly formGroup: FormGroup;

  constructor(private readonly bookService: BookService) {
    this.books = this.bookService.getBooks();
    this.formGroup = new FormGroup({
      id: new FormControl(),
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      author: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      description: new FormControl('', Validators.maxLength(1000))
    });
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
    // 1st method
    // this.formGroup.controls['title'].setValue(this.selectedBook.title);
    // this.formGroup.controls['author'].setValue(this.selectedBook.author);
    // this.formGroup.controls['description'].setValue(this.selectedBook.description);

    // 2nd method
    // this.formGroup.setValue({
    //   title: this.selectedBook.title,
    //   author: this.selectedBook.author,
    //   description: this.selectedBook.description
    // });

    // 3rd method
    // const bookForEditing = {...book};
    // delete bookForEditing.id;
    // this.formGroup.setValue(bookForEditing);

    // 4th method (ultimate)
    this.formGroup.enable();
    this.formGroup.reset(this.selectedBook);
  }

  saveBook(): void {
    if (this.selectedBook && this.formGroup.valid) {
      this.bookService.save(this.formGroup.value);
      this.selectedBook = null;
      this.books = this.bookService.getBooks();
    }
  }

  cancelEditing(): void {
    this.selectedBook = null;
  }

  toggleDisable(): void {
    const fc = this.formGroup;
    if(fc.disabled) {
      fc.enable();
    } else {
      fc.disable();
    }
  }
}
