import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";

@NgModule({
  declarations: [
    BookListComponent
  ],
  exports: [
    BookListComponent
  ],
  providers: [
    BookService
  ],
  imports: [
    CommonModule
  ]
})
export class BooksModule { }
