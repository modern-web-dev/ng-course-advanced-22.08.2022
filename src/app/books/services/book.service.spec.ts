
import { BookService } from './book.service';
import {TestBed} from "@angular/core/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {books} from "./test-books";

describe('BookService', () => {
  let service: BookService;
  let httpClientMock: any;

  beforeEach(() => {

    httpClientMock = {
      get: () => of(books())
    };

    TestBed.configureTestingModule({
      providers: [
        BookService,
        { provide: HttpClient, useValue: httpClientMock }
      ]
    });
    service = TestBed.inject(BookService);
    // service = new BookService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have three books', (done) => {
    service.getBooks().subscribe(books => {
      expect(books).toHaveSize(3);
      done();
    })
  });
});
