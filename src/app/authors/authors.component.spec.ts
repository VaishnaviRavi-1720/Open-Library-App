import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthorsComponent } from './authors.component';
import { OpenLibraryService } from '../services/open-library.service';
import { of, throwError } from 'rxjs';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;
  let openLibraryServiceMock: jasmine.SpyObj<OpenLibraryService>;

  beforeEach(() => {
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
      const mockResponse = {
        books: [{ title: 'Book 1' }, { title: 'Book 2' }],
        authors: [{ key: '1', name: 'Author 1' }, { key: '2', name: 'Author 2' }],
      };

      openLibraryServiceMock.searchBooksAndAuthors.and.returnValue(of(mockResponse));

      component.searchQuery = 'Angular';

      component.searchBooksAndAuthors();

      expect(component.books).toEqual(mockResponse.books);
      expect(component.authors).toEqual(mockResponse.authors);
      expect(component.searched).toBeTrue();
    });

    it('should handle errors if the API call fails', () => {
      openLibraryServiceMock.searchBooksAndAuthors.and.returnValue(throwError('Error fetching data'));

      component.searchBooksAndAuthors();

      expect(component.books).toEqual([]);
      expect(component.authors).toEqual([]);
      expect(component.searched).toBeFalse();
    });
  });

  describe('getAuthorNameByKey', () => {
    it('should return the correct author name when the authorKey is found', () => {
      component.authors = [
        { key: '1', name: 'Author 1' },
        { key: '2', name: 'Author 2' },
      ];

      const result = component.getAuthorNameByKey('1');

      expect(result).toBe('Author 1');
    });

    it('should return "Unknown Author" when the authorKey is not found', () => {
      component.authors = [
        { key: '1', name: 'Author 1' },
        { key: '2', name: 'Author 2' },
      ];

      const result = component.getAuthorNameByKey('3');

      expect(result).toBe('Unknown Author');
    });
  });
});