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
  onPageChange(page: number): void { 

    this.currentPage = page;
    this.onSearch();
  }
  getCoverImage(coverId: number): string { 
    return this.openLibraryService.getCoverImage(coverId);
  }
}
