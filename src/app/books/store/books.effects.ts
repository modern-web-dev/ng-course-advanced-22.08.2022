import {Injectable} from "@angular/core";
import {BookService} from "../services/book.service";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadBooksAction, saveBookAction, setBooksAction} from "./books.actions";
import {map, mergeMap} from "rxjs/operators";

@Injectable()
export class BooksEffects {

  constructor(private readonly actions$: Actions, private readonly bookService: BookService) {
  }

  // used by redux
  readonly loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(loadBooksAction),
    mergeMap(_ => this.bookService.getBooks().pipe(
      map(books => setBooksAction({books}))))
  ));

  // used by redux
  readonly saveBook$ = createEffect(() => this.actions$.pipe(
    ofType(saveBookAction),
    mergeMap(action => this.bookService.saveBook(action.book).pipe(
      map(_ => loadBooksAction())))
  ));
}
