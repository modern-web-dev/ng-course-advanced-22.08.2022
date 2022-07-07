import {Book} from "../model/book";
import {createReducer, on} from "@ngrx/store";
import {deselectBookAction, selectBookAction, setBookAction} from "./books.actions";

export const BOOKS_FEATURE = "books";

export interface BooksState {
  books: Book[],
  selectedBook: Book | null
}

export const initialBooksState: BooksState = {
  books: [],
  selectedBook: null
};

export const booksStateReducer = createReducer(
  initialBooksState,
  on(setBookAction, (state: BooksState, {books}) => ({...state, books: books})),
  on(selectBookAction, (state: BooksState, {book}) => ({...state, selectedBook: book})),
  on(deselectBookAction, (state: BooksState) => ({...state, selectedBook: null}))
)
