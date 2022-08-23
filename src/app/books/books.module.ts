import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent
  ],
  exports: [
    BookListComponent
  ],
  providers: [
    BookService
  ],
  imports: [
    CommonModule, ReactiveFormsModule, SharedModule
  ]
})
export class BooksModule {
}
