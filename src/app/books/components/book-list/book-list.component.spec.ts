import {BookListComponent} from "./book-list.component";
import {BookService} from "../../services/book.service";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {Book} from "../../model/book";
import {BookDetailsComponent} from "../book-details/book-details.component";
import {ReactiveFormsModule} from "@angular/forms";
import {Pipe, PipeTransform} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";
import {of} from "rxjs";
import {books} from "../../services/test-books";
import {EditionDetailsComponent} from "../book-details/edition-details/edition-details.component";

@Pipe({
  name: 'errorMsg'
})
class MockedErrorMsgPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return '';
  }
}

describe('BookListComponent', () => {

  let component: BookListComponent;
  let serviceMock: any;

  beforeEach(() => {
    serviceMock = {
      getBooks: () => {
        return of(books())
      }
    };
  });

  describe('[DOM]', () => {

    let fixture: ComponentFixture<BookListComponent>;
    let bookService: any;
    let nativeElement: any;

    // test utility functions
    // nouns
    const bookList = () => nativeElement.querySelectorAll('li.clickable') as NodeList;
    const editor = () => nativeElement.querySelector('#editor') as HTMLElement;
    const bookAt = (position: number) => bookList().item(position) as HTMLLIElement;
    const titleElement = () => nativeElement.querySelector('#title') as HTMLInputElement;
    const authorElement = () => nativeElement.querySelector('#author') as HTMLInputElement;
    const descriptionElement = () => nativeElement.querySelector('#description') as HTMLTextAreaElement;
    const cancelButton = () => nativeElement.querySelector('#cancel') as HTMLButtonElement;
    const saveButton = () => nativeElement.querySelector('#save') as HTMLButtonElement;
    // verbs
    const clickBookAt = (position: number) => bookAt(position).dispatchEvent(new MouseEvent('click'));
    const detectChanges = () => fixture.detectChanges();
    const clickCancel = () => cancelButton().dispatchEvent(new MouseEvent('click'));
    const clickSave = () => saveButton().dispatchEvent(new MouseEvent('click'));
    const editField = (field: HTMLInputElement | HTMLTextAreaElement, value: string) => {
      field.value = value;
      field.dispatchEvent(new Event('input'));
    }

    beforeEach(async () => {
      bookService = {
        getBooks: jasmine.createSpy().and.returnValue(of(books())),
        saveBook: jasmine.createSpy().and.returnValue(of(books()[1]))
      };

      await TestBed.configureTestingModule({
        declarations: [BookListComponent, BookDetailsComponent, EditionDetailsComponent],
        imports: [ReactiveFormsModule, SharedModule],
        providers: [{provide: BookService, useValue: bookService}]
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(BookListComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.nativeElement;
      detectChanges();
    });

    it('can be created', () => {
      expect(component).toBeTruthy();
    })

    it('shows an editor once a book is clicked', () => {
      // given
      expect(bookList().length).toEqual(3);
      expect(editor()).toBeFalsy();
      // when
      clickBookAt(1);
      detectChanges();
      // then
      const book = component.selectedBook;
      expect(editor()).toBeTruthy();
      expect(titleElement().value).toBe(book!!.title);
      expect(authorElement().value).toBe(book!!.author);
      expect(descriptionElement().value).toBe(book!!.description);
    });

    it('closes editor once cancel is clicked', () => {
      // given
      expect(bookList().length).toEqual(3);
      expect(editor()).toBeFalsy();
      clickBookAt(1);
      detectChanges();
      expect(editor()).toBeTruthy();
      // when
      clickCancel();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
    });

    it('saves a modified book', () => {
      // given
      expect(editor()).toBeFalsy();
      clickBookAt(1);
      detectChanges();
      expect(editor()).toBeTruthy();
      // when
      editField(titleElement(), 'foo');
      editField(authorElement(), 'bar');
      editField(descriptionElement(), 'some other description');
      detectChanges();
      clickSave();
      detectChanges();
      // then
      expect(editor()).toBeFalsy();
      expect(bookService.saveBook).toHaveBeenCalledOnceWith({
        id: 2,
        title: 'foo',
        author: 'bar',
        description: 'some other description',
        edition: {
          publisher: 'Amazon',
          publishYear: 1990,
          editionNumber: 1
        }
      });
    });
  });

  describe('[class]', () => {

    beforeEach(() => {
      component = new BookListComponent(serviceMock);
    });

    it('has no selected book initially', () => {
      expect(component.selectedBook).toBeFalsy();
    });

    it('book can be selected', () => {
      // given
      const book: Book = {
        id: 1,
        title: 'foo',
        author: 'bar',
        description: 'abc',
        edition: {
          publisher: 'Amazon',
          publishYear: 1990,
          editionNumber: 1
        }
      };
      // when
      component.selectBook(book);
      // then
      expect(component.selectedBook).toBeTruthy();
      expect(component.selectedBook).toEqual(book);
    });

  });
});
