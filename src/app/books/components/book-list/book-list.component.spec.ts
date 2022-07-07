import {BookListComponent} from "./book-list.component";
import {BookService} from "../../services/book.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../shared/shared.module";
import {of} from "rxjs";
import {Book} from "../../model/book";

describe('BookListComponent', () => {

  let component: BookListComponent;
  let bookServiceMock: any;

  const books = () => [{
    id: 1,
    title: 'Solaris',
    author: 'Stanisław Lem',
    description: 'Solaris chronicles the ultimate futility of attempted communications with the extraterrestrial life inhabiting a distant alien planet named Solaris. The planet is almost completely covered with an ocean of gel that is revealed to be a single, planet-encompassing entity. Terran scientists conjecture it is a living and a sentient being, and attempt to communicate with it.'
  }, {
    id: 2,
    title: '2001: A Space Odyssey',
    author: 'Aurthur C. Clarke',
    description: 'A mysterious alien civilization uses a tool with the appearance of a large crystalline monolith to investigate worlds across the galaxy and, if possible, to encourage the development of intelligent life. The book shows one such monolith appearing in prehistoric Africa, 3 million years ago (in the movie, 4 mya), where it inspires a starving group of hominids to develop tools. The hominids use their tools to kill animals and eat meat, ending their starvation. They then use the tools to kill a leopard preying on them; the next day, the main ape character, Moon-Watcher, uses a club to kill the leader of a rival tribe. The book suggests that the monolith was instrumental in awakening intelligence.'
  }, {
    id: 3,
    title: 'Ubik',
    author: 'Phillip K. Dick',
    description: 'By the year 1992, humanity has colonized the Moon and psychic powers are common. The protagonist, Joe Chip, is a debt-ridden technician working for Runciter Associates, a "prudence organization" employing "inertials"—people with the ability to negate the powers of telepaths and "precogs"—to enforce the privacy of clients. The company is run by Glen Runciter, assisted by his deceased wife Ella who is kept in a state of "half-life", a form of cryonic suspension that allows the deceased limited consciousness and ability to communicate. While consulting with Ella, Runciter discovers that her consciousness is being invaded by another half-lifer named Jory Miller.'
  }];

  beforeEach(() => {
    bookServiceMock = {
      getBooks: () => of(books()),
      save: (book: Book) => of(book)
    };
  });

  describe('[class]', () => {

    beforeEach(() => {
      component = new BookListComponent(bookServiceMock);
    });

    it('should have no book selected initially', () => {
      expect(component.selectedBook).toBeNull();
    });

    it('should be possible to select a book', () => {
      // given
      const book = books()[1];
      // when
      component.selectBook(book);
      // then
      expect(component.selectedBook).toBeTruthy();
      expect(component.selectedBook).toBe(book);
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
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => {
      field.value = value;
      field.dispatchEvent(new Event('input'));
    };
    const cd = () => fixture.detectChanges();

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [BookListComponent],
        imports: [ReactiveFormsModule, SharedModule],
        providers: [
          { provide: BookService, useValue: bookServiceMock}
        ]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      //bookService = fixture.debugElement.injector.get(BookService);
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
      const toBeSelected = books()[bookIndex];
      expect(component.selectedBook).toEqual(toBeSelected);
      expect(bookAt(0).classList.contains('selected')).toBeFalsy();
      expect(bookAt(1).classList.contains('selected')).toBeTruthy();

      expect(titleElement().value).toEqual(toBeSelected.title);
      expect(authorElement().value).toEqual(toBeSelected.author);
      expect(descriptionElement().value).toEqual(toBeSelected.description);
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

    it('saves modified book to the books service', () => {
      // given
      spyOn(bookServiceMock, 'save').and.callThrough();
      clickBookAt(1);
      cd();
      expect(editor()).toBeTruthy();
      const toBeSelected = books()[1];
      expect(titleElement().value).toEqual(toBeSelected.title);
      expect(authorElement().value).toEqual(toBeSelected.author);
      expect(descriptionElement().value).toEqual(toBeSelected.description);
      // when
      editField(titleElement(), "New title");
      editField(authorElement(), "New author");
      editField(descriptionElement(), "New description");
      cd();
      clickSave();
      cd();
      // then
      expect(editor()).toBeFalsy();
      expect(component.selectedBook).toBeNull();
      expect(bookServiceMock.save).toHaveBeenCalledOnceWith({
        id: 2,
        title: 'New title',
        author: 'New author',
        description: 'New description'
      });
    });
  });
});
