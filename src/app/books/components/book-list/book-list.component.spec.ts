import {BookListComponent} from "./book-list.component";
import {BookService} from "../../services/book.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";

describe('BookListComponent', () => {

  let component: BookListComponent;

  describe('[class]', () => {
    let bookService: BookService;

    beforeEach(() => {
      bookService = new BookService();
      component = new BookListComponent(bookService);
    });

    it('should have no book selected initially', () => {
      expect(component.selectedBook).toBeNull();
    });

    it('should be possible to select a book', () => {
      // when
      component.selectBook(bookService.getBooks()[1]);
      // then
      expect(component.selectedBook).toBeTruthy();
      expect(component.selectedBook).toBe(bookService.getBooks()[1]);
    });

    it('should contain books initially', () => {
      expect(component.books).toHaveSize(3);
    });
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      fixture.detectChanges();
    });

    it('can be created', () => {
      expect(component).toBeTruthy();
    });

    it('renders a list of books', () => {
      const liElements = nativeElement.querySelectorAll('li.list-group-item');
      expect(liElements.length).toBe(3);
    });
  });
});
