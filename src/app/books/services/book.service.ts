import {Injectable, OnDestroy} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {delay} from "rxjs/operators";

const API_PREFIX = "/api/books";

@Injectable()
export class BookService implements OnDestroy {

  constructor(private readonly httpClient: HttpClient) {
    console.log('BookService constructor');
  }

  ngOnDestroy(): void {
    console.log('BookService ngOnDestroy');
  }

  getBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(API_PREFIX);
  }

  saveBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${API_PREFIX}/${book.id}`, book);
  }
}
