import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';
import {Component} from "@angular/core";
import {Book} from "../../model/book";

@Component({
  template: '<app-book-details [book]="book"></app-book-details>'
})
class TestComponent {
  book: Book | undefined;
}

describe('BookDetailsComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestComponent, BookDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.book = {};
    fixture.detectChanges();
  });
});
