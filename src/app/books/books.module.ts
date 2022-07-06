import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './components/book-list/book-list.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    BookListComponent
  ],
  exports: [
    BookListComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  providers: []
})
export class BooksModule { }
