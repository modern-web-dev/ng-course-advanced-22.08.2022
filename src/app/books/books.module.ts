import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './components/book-list/book-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {BookService} from "./services/book.service";
import {HttpClientModule} from "@angular/common/http";
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {EditionDetailsComponent} from './components/book-details/edition-details/edition-details.component';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    EditionDetailsComponent
  ],
  exports: [
    BookListComponent,
    BookDetailsComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, SharedModule, HttpClientModule
  ],
  providers: [BookService]
})
export class BooksModule {
}
