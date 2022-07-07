import {createAction, props} from "@ngrx/store";
import {Book} from "../model/book";

export enum BooksActionTypes {
  SetBooks = '[Books] Set books',
  SelectBook = '[Books] Select book',
  DeselectBook = '[Books] Deselect book'
}

export const setBookAction = createAction(BooksActionTypes.SetBooks, props<{ books: Book[]}>());
export const selectBookAction = createAction(BooksActionTypes.SelectBook, props<{ book: Book }>());
export const deselectBookAction = createAction(BooksActionTypes.DeselectBook);
