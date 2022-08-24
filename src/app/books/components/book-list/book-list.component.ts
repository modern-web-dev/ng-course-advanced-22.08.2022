import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges,} from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../services/book.service";
import {Observable} from "rxjs";
import {BooksState} from "../../store/books.reducer";
import {select, Store} from "@ngrx/store";
import {BooksSelector} from "../../store/books.selectors";
import {deselectBookAction, selectBookAction, setBooksAction} from "../../store/books.actions";

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnChanges, OnInit, OnDestroy, AfterViewInit {

  readonly books$: Observable<Book[]>;
  readonly selectedBook$: Observable<Book | null>;

  constructor(private readonly bookService: BookService, private readonly store: Store<BooksState>) {
    console.log('BookListComponent constructor');
    this.books$ = this.store.pipe(select(BooksSelector.getBooks));
    this.selectedBook$ = this.store.pipe(select(BooksSelector.getSelectedBook));

    this.bookService.getBooks()
      .subscribe(books => this.store.dispatch(setBooksAction({books})));
  }

  ngOnInit(): void {
    console.log('BookListComponent ngOnInit');
  }

  ngOnDestroy(): void {
    console.log('BookListComponent ngOnDestroy');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('BookListComponent ngOnChanges');
  }

  ngAfterViewInit(): void {
    console.log('BookListComponent ngAfterViewInit');
  }

  saveBook(book: Book): void {
    this.bookService.saveBook(book).subscribe(_ => {
      this.store.dispatch(deselectBookAction());
      this.bookService.getBooks().subscribe(books => this.store.dispatch(setBooksAction({books})));
    });
  }

  cancel(): void {
    this.store.dispatch(deselectBookAction());
  }

  selectBook(book: Book): void {
    this.store.dispatch(selectBookAction({book}));
  }
}
