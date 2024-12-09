import { Component, OnInit } from '@angular/core';
import { OpenLibraryService } from '../services/open-library.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  searchQuery: string = '';
  books: any[] = [];
  authors: any[] = [];
  searched: boolean = false;

  constructor(private openLibraryService: OpenLibraryService) {}

  ngOnInit(): void {}

  searchBooksAndAuthors(): void {
    this.openLibraryService.searchBooksAndAuthors(this.searchQuery).subscribe(
      (result) => {
        this.books = result.books;
        this.authors = result.authors;
        this.searched = true;
      },
      (error) => {
        console.error('Error fetching books and authors:', error);
      }
    );
  }

  getAuthorNameByKey(authorKey: string): string {
    const author = this.authors.find((a) => a.key === authorKey);
    return author ? author.name : 'Unknown Author';
  }
}
