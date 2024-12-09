import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookSearchComponent } from './book-search.component';
import { OpenLibraryService } from 'src/app/services/open-library.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let mockService: jasmine.SpyObj<OpenLibraryService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('OpenLibraryService', ['searchBooks', 'getCoverImage']);
    
    await TestBed.configureTestingModule({
      declarations: [BookSearchComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: OpenLibraryService, useValue: mockService }]
    }).compileComponents();

    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch books and update the component state on successful search', () => {
    const mockResponse = {
      docs: [{ title: 'Test Book', author_name: ['Author'], cover_i: 123 }],
      num_found: 1
    };
    mockService.searchBooks.and.returnValue(of(mockResponse));
    
    component.searchQuery = 'test';
    component.onSearch();

    expect(mockService.searchBooks).toHaveBeenCalledWith('test', component.currentPage);
    expect(component.books).toEqual(mockResponse.docs);
    expect(component.totalBooks).toBe(mockResponse.num_found);
    expect(component.loading).toBeFalse();
  });

  it('should not fetch books if search query is empty', () => {
    component.searchQuery = '   ';
    component.onSearch();

    expect(mockService.searchBooks).not.toHaveBeenCalled();
    expect(component.books).toEqual([]);
    expect(component.totalBooks).toBe(0);
  });

  it('should handle errors from the service gracefully', () => {
    mockService.searchBooks.and.returnValue(throwError('Error occurred'));
    
    component.searchQuery = 'test';
    component.onSearch();

    expect(mockService.searchBooks).toHaveBeenCalled();
    expect(component.books).toEqual([]);
    expect(component.totalBooks).toBe(0);
    expect(component.loading).toBeFalse();
  });

  it('should update the page and call the onSearch method', () => {
    spyOn(component, 'onSearch'); // Spy on the onSearch method

    component.onPageChange(2);

    expect(component.currentPage).toBe(2);
    expect(component.onSearch).toHaveBeenCalled();
  });

  it('should return the correct cover image URL', () => {
    mockService.getCoverImage.and.returnValue('https://covers.openlibrary.org/b/id/123-L.jpg');
    
    const coverUrl = component.getCoverImage(123);
    
    expect(mockService.getCoverImage).toHaveBeenCalledWith(123);
    expect(coverUrl).toBe('https://covers.openlibrary.org/b/id/123-L.jpg');
  });
});
