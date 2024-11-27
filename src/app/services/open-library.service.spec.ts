import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OpenLibraryService } from './open-library.service';

describe('SearchBooks',()=>{
})

describe('OpenLibraryService', () => {
  let service: OpenLibraryService;
  let httpMock: HttpTestingController;

  const mockBooksResponse = {
    docs: [
      { key: '/works/OL1234567W', title: 'Angular for Beginners', author_name: ['John Doe'], author_key: ['OL12345A'] },
      { key: '/works/OL7654321W', title: 'Advanced Angular', author_name: ['Jane Smith'], author_key: ['OL54321B'] },
    ],
  };

  const mockAuthorResponse = {
    key: 'OL12345A',
    name: 'John Doe',
  };

  const mockEditionsResponse = {
    title: 'Angular for Beginners',
    editions: ['Edition 1', 'Edition 2'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OpenLibraryService],
    });

    service = TestBed.inject(OpenLibraryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no unmatched requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchBooks', () => {
    it('should fetch books based on the search query', () => {
      const query = 'Angular';

      service.searchBooks(query).subscribe((response) => {
        expect(response).toEqual(mockBooksResponse);
      });

      const req = httpMock.expectOne((request) => request.url === 'https://openlibrary.org/search.json');
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('q')).toBe(query);

      req.flush(mockBooksResponse); // Return the mock response
    });
  });

  describe('getEditions', () => {
    it('should fetch editions for a given work', () => {
      const workId = 'OL1234567W';

      service.getEditions(workId).subscribe((response) => {
        expect(response).toEqual(mockEditionsResponse);
      });

      const req = httpMock.expectOne(
        `https://openlibrary.org/works/${workId}.json`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockEditionsResponse);
    });
  });

  describe('getCoverImage', () => {
    it('should return the correct URL for the cover image', () => {
      const coverId = 12345;
      const imageUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
      expect(service.getCoverImage(coverId)).toBe(imageUrl);
    });
  });

  describe('getWorkDetails', () => {
    it('should fetch details of a work based on workId', () => {
      const workId = 'OL1234567W';

      service.getWorkDetails(workId).subscribe((response) => {
        expect(response).toEqual(mockEditionsResponse);
      });

      const req = httpMock.expectOne(
        `https://openlibrary.org/works/${workId}.json`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockEditionsResponse);
    });
  });

  describe('searchBooksAndAuthors', () => {
    it('should fetch books and authors based on the search query', () => {
      const title = 'Angular';

      service.searchBooksAndAuthors(title).subscribe((response) => {
        expect(response.books).toEqual(mockBooksResponse.docs);
        expect(response.authors.length).toBe(2); // Because there are two unique author keys
      });

      const booksReq = httpMock.expectOne(
        'https://openlibrary.org/search.json?title=Angular'
      );
      expect(booksReq.request.method).toBe('GET');
      booksReq.flush(mockBooksResponse);

      const authorsReq1 = httpMock.expectOne(
        'https://openlibrary.org/authors/OL12345A.json'
      );
      const authorsReq2 = httpMock.expectOne(
        'https://openlibrary.org/authors/OL54321B.json'
      );
      expect(authorsReq1.request.method).toBe('GET');
      expect(authorsReq2.request.method).toBe('GET');

      authorsReq1.flush(mockAuthorResponse);
      authorsReq2.flush(mockAuthorResponse);
    });
  });

  describe('getAuthorDetails', () => {
    it('should fetch author details for a given author key', () => {
      const authorKey = 'OL12345A';

      service.getAuthorDetails(authorKey).subscribe((response) => {
        expect(response).toEqual(mockAuthorResponse);
      });

      const req = httpMock.expectOne(
        `https://openlibrary.org/authors/${authorKey}.json`
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockAuthorResponse);
    });
  });
});
