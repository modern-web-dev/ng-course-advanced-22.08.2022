
import { BookService } from './book.service';
import {TestBed} from "@angular/core/testing";

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    // service = new BookService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have three books', () => {
    expect(service.getBooks()).toHaveSize(3);
  });
});
