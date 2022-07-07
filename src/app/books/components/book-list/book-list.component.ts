import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../model/book";
import {Observable, Subject} from "rxjs";
import {BooksState} from "../../store/books.reducer";
import {select, Store} from "@ngrx/store";
import {BooksSelector} from "../../store/books.selectors";
import {deselectBookAction, selectBookAction, setBooksAction} from "../../store/books.actions";
import {takeUntil} from "rxjs/operators";

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

  constructor(private readonly bookService: BookService, private readonly store: Store<BooksState>) {
    console.log('BookListComponent constructed');
    this.books$ = this.store.pipe(select(BooksSelector.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));
    this.bookService.getBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(books => this.store.dispatch(setBooksAction({books})))
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
    this.bookService.save(book)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.bookService.getBooks()
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(books => this.store.dispatch(setBooksAction({books})));
        this.store.dispatch(deselectBookAction());
      });
  }

  cancelEditing(): void {
    this.store.dispatch(deselectBookAction());
  }
}
