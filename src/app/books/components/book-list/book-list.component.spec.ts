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

    // utility functions
    // nouns
    const editor = () => nativeElement.querySelector('#editor');
    const bookList = () => nativeElement.querySelectorAll('li.list-group-item');
    const bookAt = (position: number) => bookList().item(position) as HTMLLIElement;
    const titleElement = () => nativeElement.querySelector("input#title") as HTMLInputElement;
    const authorElement = () => nativeElement.querySelector("input#author") as HTMLInputElement;
    const descriptionElement = () => nativeElement.querySelector('textarea#description') as HTMLTextAreaElement;
    const cancelButton = () => nativeElement.querySelector("button#cancel") as HTMLButtonElement;
    const saveButton = () => nativeElement.querySelector("button#save") as HTMLButtonElement;
    // verbs
    const clickBookAt = (position: number) => bookAt(position).dispatchEvent(new MouseEvent('click'));
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const cd = () => fixture.detectChanges();

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
      expect(bookList().length).toBe(3);
    });

    it('selected a book on clicking', () => {
      // given
      const bookIndex = 1;
      expect(component.selectedBook).toBeNull();
      expect(editor()).toBeFalsy();
      // when
      clickBookAt(bookIndex);
      cd();
      // then
      expect(editor()).toBeTruthy();
      const toBeSelected = component.books[bookIndex];
      expect(component.selectedBook).toEqual(toBeSelected);
      expect(titleElement().value).toEqual(toBeSelected.title);
      expect(authorElement().value).toEqual(toBeSelected.author);
      expect(descriptionElement().value).toEqual(toBeSelected.description);
      expect(bookAt(0).classList.contains('selected')).toBeFalsy();
      expect(bookAt(1).classList.contains('selected')).toBeTruthy();
    });

    it('closes editor after clicking cancel', () => {
      // given
      expect(component.selectedBook).toBeNull();
      clickBookAt(1);
      cd();
      expect(editor()).toBeTruthy();
      // when
      clickCancel();
      cd();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBook).toBeNull();
    });
  });
});
