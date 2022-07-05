
import { BookService } from './book.service';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    service = new BookService()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
