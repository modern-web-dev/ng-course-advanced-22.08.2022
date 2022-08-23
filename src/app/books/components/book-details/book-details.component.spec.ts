import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import {Book} from "../../model/book";

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;
  let book: Book;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent ]
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
