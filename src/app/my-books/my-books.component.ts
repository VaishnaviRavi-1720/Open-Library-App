import { Component, OnInit } from '@angular/core';
import { OpenLibraryService } from '../services/open-library.service';

@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  wantToReadBooks: any[] = [];
  currentlyReadingBooks: any[] = [];
  alreadyReadBooks: any[] = [];

  constructor(private openLibraryService: OpenLibraryService) {}

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    // Fetch books in the "Want to Read" category
    this.openLibraryService.getWantToReadBooks().subscribe(
      (data: any) => {
        this.wantToReadBooks = data.books || [];
      },
      (error) => {
        console.error('Error fetching Want to Read books', error);
      }
    );

    // Fetch books in the "Currently Reading" category
    this.openLibraryService.getCurrentlyReadingBooks().subscribe(
      (data: any) => {
        this.currentlyReadingBooks = data.books || [];
      },
      (error) => {
        console.error('Error fetching Currently Reading books', error);
      }
    );

    // Fetch books in the "Already Read" category
    this.openLibraryService.getAlreadyReadBooks().subscribe(
      (data: any) => {
        this.alreadyReadBooks = data.books || [];
      },
      (error) => {
        console.error('Error fetching Already Read books', error);
      }
    );
  }
}
// for this write Angular Test Cases based on abouve thing in my-books.component.spec.ts