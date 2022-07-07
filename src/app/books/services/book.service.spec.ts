
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {};
    service = new BookService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
