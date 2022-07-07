import {Injectable, OnDestroy} from '@angular/core';
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const API_PREFIX = "http://localhost:3000/api/books";

@Injectable()
export class BookService implements OnDestroy {

  constructor(private readonly http: HttpClient) {
    console.log("BookService created");
  }

  ngOnDestroy(): void {
    console.log('BookService destroyed');
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(API_PREFIX);
  }

  save(book: Book): Observable<Book> {
    return this.http.put<Book>(`${API_PREFIX}/${book.id}`, book);
  }
}
