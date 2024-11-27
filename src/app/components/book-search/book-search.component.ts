import { Component } from '@angular/core';
import { OpenLibraryService } from 'src/app/services/open-library.service';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent {
  searchQuery: string = '';
  books: any[] = [];
  currentPage: number = 1;
  totalBooks: number = 0;
  loading: boolean = false;

  constructor(private openLibraryService: OpenLibraryService) {}

  // Method to handle the search logic
  onSearch(): void { 
    if (this.searchQuery.trim() === '') {
      return;
    }
    this.loading = true;
    this.openLibraryService.searchBooks(this.searchQuery, this.currentPage).subscribe(
      (response) => {
        this.books = response.docs;
        this.totalBooks = response.num_found;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching book data', error);
        this.loading = false;
      }
    );
  }

  // Method for pagination (next and previous pages)
  onPageChange(page: number): void { 

    this.currentPage = page;
    this.onSearch();
  }

  // Method to get the book cover image URL
  getCoverImage(coverId: number): string { 
    return this.openLibraryService.getCoverImage(coverId);
  }
}
// write a angular unit test cases based on above methods where a particular method for particular purpose 
