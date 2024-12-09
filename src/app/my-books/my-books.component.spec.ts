import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyBooksComponent } from './my-books.component';
import { OpenLibraryService } from '../services/open-library.service';
import { of, throwError } from 'rxjs';
import { describe } from 'node:test';

describe('MyBooksComponent', () => {
  let component: MyBooksComponent;
  let fixture: ComponentFixture<MyBooksComponent>;
  let mockService: jasmine.SpyObj<OpenLibraryService>;

  beforeEach(async () => {
    // Create a mock for OpenLibraryService
    mockService = jasmine.createSpyObj('OpenLibraryService', [
      'getWantToReadBooks',
      'getCurrentlyReadingBooks',
      'getAlreadyReadBooks',
    ]);

    await TestBed.configureTestingModule({
      declarations: [MyBooksComponent],
      providers: [{ provide: OpenLibraryService, useValue: mockService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MyBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch "Want to Read" books and update the state', () => {
    const mockBooks = { books: [{ title: 'Book 1' }, { title: 'Book 2' }] };
    mockService.getWantToReadBooks.and.returnValue(of(mockBooks));

    component.fetchBooks();

    expect(mockService.getWantToReadBooks).toHaveBeenCalled();
    expect(component.wantToReadBooks).toEqual(mockBooks.books);
  });

  it('should handle errors when fetching "Want to Read" books', () => {
    mockService.getWantToReadBooks.and.returnValue(throwError('Error occurred'));

    component.fetchBooks();

    expect(mockService.getWantToReadBooks).toHaveBeenCalled();
    expect(component.wantToReadBooks).toEqual([]);
  });

  it('should fetch "Currently Reading" books and update the state', () => {
    const mockBooks = { books: [{ title: 'Book 3' }, { title: 'Book 4' }] };
    mockService.getCurrentlyReadingBooks.and.returnValue(of(mockBooks));

    component.fetchBooks();

    expect(mockService.getCurrentlyReadingBooks).toHaveBeenCalled();
    expect(component.currentlyReadingBooks).toEqual(mockBooks.books);
  });

  it('should handle errors when fetching "Currently Reading" books', () => {
    mockService.getCurrentlyReadingBooks.and.returnValue(throwError('Error occurred'));

    component.fetchBooks();

    expect(mockService.getCurrentlyReadingBooks).toHaveBeenCalled();
    expect(component.currentlyReadingBooks).toEqual([]);
  });

  it('should fetch "Already Read" books and update the state', () => {
    const mockBooks = { books: [{ title: 'Book 5' }, { title: 'Book 6' }] };
    mockService.getAlreadyReadBooks.and.returnValue(of(mockBooks));

    component.fetchBooks();

    expect(mockService.getAlreadyReadBooks).toHaveBeenCalled();
    expect(component.alreadyReadBooks).toEqual(mockBooks.books);
  });

  it('should handle errors when fetching "Already Read" books', () => {
    mockService.getAlreadyReadBooks.and.returnValue(throwError('Error occurred'));

    component.fetchBooks();

    expect(mockService.getAlreadyReadBooks).toHaveBeenCalled();
    expect(component.alreadyReadBooks).toEqual([]);
  });
});
