import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListComponent} from './components/book-list/book-list.component';
import {BookService} from "./services/book.service";
import {BookDetailsComponent} from './components/book-details/book-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { EditionDetailsComponent } from './components/book-details/edition-details/edition-details.component';
import {StoreModule} from "@ngrx/store";
import {BOOKS_FEATURE, booksStateReducer} from "./store/books.reducer";
import {EffectsModule} from "@ngrx/effects";
import {BooksEffects} from "./store/books.effects";
import {BooksRoutingModule} from "./books-routing.module";
import {WidgetsModule} from "../../../projects/widgets/src/lib/widgets.module";

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    EditionDetailsComponent
  ],
  exports: [
    BookListComponent
  ],
  providers: [
    BookService
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    WidgetsModule,
    HttpClientModule,
    BooksRoutingModule,
    StoreModule.forFeature(BOOKS_FEATURE, booksStateReducer),
    EffectsModule.forFeature([BooksEffects])
  ]
})
export class BooksModule {
}
