import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookDetailsComponent} from './book-details.component';
import {Book} from "../../model/book";
import {ReactiveFormsModule} from "@angular/forms";
import {SimpleChange} from "@angular/core";
import {SharedModule} from "../../../shared/shared.module";

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let book: Book;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      imports: [ReactiveFormsModule, SharedModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    book = {
      id: 0,
      title: 'foo',
      author: 'bar',
      description: 'abc'
    }
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    component.selectedBook = book;
    component.ngOnChanges({selectedBook: new SimpleChange(undefined, book, true)});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
