import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Book} from "../../model/book";
import {Observable, Subject} from "rxjs";
import {BooksState} from "../../store/books.reducer";
import {select, Store} from "@ngrx/store";
import {BooksSelector} from "../../store/books.selectors";
import {
  deselectBookAction,
  loadBooksAction,
  saveBookAction,
  selectBookAction,
} from "../../store/books.actions";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  providers: []
})
export class BookListComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  readonly books$: Observable<Book[]>;
  readonly selectedBook$: Observable<Book | null>;

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly store: Store<BooksState>) {
    console.log('BookListComponent constructed');
    this.books$ = this.store.pipe(select(BooksSelector.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));
    this.store.dispatch(loadBooksAction());
  }

  ngOnInit(): void {
    console.log('BookListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('BookListComponent ngOnDestroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(`BookListComponent ngOnChanges: ${JSON.stringify(changes)}`);
  }

  ngAfterViewInit(): void {
    console.log('BookListComponent ngAfterViewInit');
  }

  selectBook(book: Book): void {
    this.store.dispatch(selectBookAction({book: book}));
  }

  saveBook(book: Book): void {
    this.store.dispatch(saveBookAction({ book }));
    this.store.dispatch(deselectBookAction());
  }

  cancelEditing(): void {
    this.store.dispatch(deselectBookAction());
  }
}
