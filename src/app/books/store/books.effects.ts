import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {loadBooksAction, saveBookAction, setBooksAction} from "./books.actions";
import {map, mergeMap} from "rxjs/operators";
import {BookService} from "../services/book.service";

@Injectable()
export class BooksEffects {

  constructor(private readonly actions$: Actions, private readonly bookService: BookService) {
  }

  readonly loadBooks$ = createEffect(() => this.actions$.pipe(
    ofType(loadBooksAction),
    mergeMap(_ => this.bookService.getBooks().pipe(
      map(books => setBooksAction({books}))))
  ));

  readonly saveBook$ = createEffect(() => this.actions$.pipe(
    ofType(saveBookAction),
    mergeMap(action => this.bookService.save(action.book).pipe(
      map(_ => loadBooksAction())))
  ));
}
