import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorsComponent } from './authors.component';
import { OpenLibraryService } from '../services/open-library.service';
import { of, throwError } from 'rxjs';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let openLibraryServiceMock: jasmine.SpyObj<OpenLibraryService>;

  beforeEach(() => {
    // Create a mock service
    openLibraryServiceMock = jasmine.createSpyObj('OpenLibraryService', ['searchBooksAndAuthors']);

    TestBed.configureTestingModule({
      declarations: [AuthorsComponent],
      providers: [
        { provide: OpenLibraryService, useValue: openLibraryServiceMock },
      ],
    });

    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('searchBooksAndAuthors', () => {
    it('should fetch books and authors successfully', () => {
      // Mock the response of the service
      const mockResponse = {
        books: [{ title: 'Book 1' }, { title: 'Book 2' }],
        authors: [{ key: '1', name: 'Author 1' }, { key: '2', name: 'Author 2' }],
      };

      // Make the service method return an observable with the mock response
      openLibraryServiceMock.searchBooksAndAuthors.and.returnValue(of(mockResponse));

      // Set a search query
      component.searchQuery = 'Angular';

      // Call the method
      component.searchBooksAndAuthors();

      // Check that the books and authors are set correctly
      expect(component.books).toEqual(mockResponse.books);
      expect(component.authors).toEqual(mockResponse.authors);
      expect(component.searched).toBeTrue();
    });

    it('should handle errors if the API call fails', () => {
      // Simulate an error response
      openLibraryServiceMock.searchBooksAndAuthors.and.returnValue(throwError('Error fetching data'));

      // Call the method
      component.searchBooksAndAuthors();

      // Check that the books and authors remain empty and searched flag is false
      expect(component.books).toEqual([]);
      expect(component.authors).toEqual([]);
      expect(component.searched).toBeFalse();
    });
  });

  describe('getAuthorNameByKey', () => {
    it('should return the correct author name when the authorKey is found', () => {
      // Set up the mock authors array
      component.authors = [
        { key: '1', name: 'Author 1' },
        { key: '2', name: 'Author 2' },
      ];

      // Call the method with a valid key
      const result = component.getAuthorNameByKey('1');

      // Check that the correct author name is returned
      expect(result).toBe('Author 1');
    });

    it('should return "Unknown Author" when the authorKey is not found', () => {
      // Set up the mock authors array
      component.authors = [
        { key: '1', name: 'Author 1' },
        { key: '2', name: 'Author 2' },
      ];

      // Call the method with a non-existing key
      const result = component.getAuthorNameByKey('3');

      // Check that "Unknown Author" is returned when the key is not found
      expect(result).toBe('Unknown Author');
    });
  });
});
// explain this code in simple way and hummanizable way