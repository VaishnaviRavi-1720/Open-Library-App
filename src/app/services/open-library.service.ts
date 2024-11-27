// src/app/services/open-library.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OpenLibraryService {

  private baseUrl = 'https://openlibrary.org/search.json';

  constructor(private http: HttpClient) { }

  // Method to search books by title, author, or keyword
  searchBooks(query: string, page: number = 1, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('q', query)
      .set('page', page.toString())
      .set('limit', limit.toString())
      .set('fields', 'key,title,author_name,first_publish_year,cover_i');

    return this.http.get<any>(this.baseUrl, { params });
  }

  // Method to fetch editions for a particular work
  getEditions(workId: string): Observable<any> {
    const url = `https://openlibrary.org/works/${workId}.json`;
    return this.http.get<any>(url);
  }

  // Method to get the cover image by cover ID
  getCoverImage(coverId: number): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
  }

  private apiUrl = 'https://openlibrary.org';
  // Fetch Work details by Work ID
  getWorkDetails(workId: string): Observable<any> {
    const url = `${this.apiUrl}/works/${workId}.json`;
    return this.http.get<any>(url);
  }

  // Fetch Editions by Work ID
  getEditionsByWork(workId: string): Observable<any> {
    const url = `${this.apiUrl}/works/${workId}/editions.json`;
    return this.http.get<any>(url);
  }

  // Fetch Edition details by Edition ID
  getEditionDetails(editionId: string): Observable<any> {
    const url = `${this.apiUrl}/books/${editionId}.json`;
    return this.http.get<any>(url);
  }

  // Fetch ISBN details directly by ISBN
  getBookByISBN(isbn: string): Observable<any> {
    const url = `${this.apiUrl}/isbn/${isbn}.json`;
    return this.http.get<any>(url);
  }
  private base = 'https://openlibrary.org/people/mekBot/books/';

  getWantToReadBooks(): Observable<any> {
    return this.http.get(`${this.base}want-to-read.json`);
  }

  getCurrentlyReadingBooks(): Observable<any> {
    return this.http.get(`${this.base}currently-reading.json`);
  }

  getAlreadyReadBooks(): Observable<any> {
    return this.http.get(`${this.base}already-read.json`);
  }
  private ba = 'https://openlibrary.org';

    // Search books by title
    searchBooksByTitle(title: string): Observable<any> {
      const url = `${this.ba}/search.json?title=${encodeURIComponent(title)}`;
      return this.http.get<any>(url);
    }
  
    // Get author details by author key
    getAuthorDetails(authorKey: string): Observable<any> {
      const url = `${this.ba}/authors/${authorKey}.json`;
      return this.http.get<any>(url);
    }
    searchBooksAndAuthors(title: string): Observable<any> {
      return this.searchBooksByTitle(title).pipe(
        switchMap((bookResults: any) => {
          // Extract unique author keys and ensure they're strings
          const authorKeys: string[] = bookResults.docs
            .map((doc: any) => doc.author_key)
            .flat()
            .filter((key: unknown): key is string => typeof key === 'string');
    
          const authorRequests = [...new Set(authorKeys)].map((key: string) =>
            this.getAuthorDetails(key)
          );
    
          return forkJoin(authorRequests).pipe(
            map((authorDetails: any[]) => ({
              books: bookResults.docs,
              authors: authorDetails,
            }))
          );
        })
      );
    }       
}
// for the abouve open-library.service.ts we have to develop angular test cases 