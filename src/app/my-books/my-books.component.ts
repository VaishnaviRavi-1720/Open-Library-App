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
    this.openLibraryService.getWantToReadBooks().subscribe(
      (data: any) => {
        this.wantToReadBooks = data.books || [];
      },
      (error) => {
        console.error('Error fetching Want to Read books', error);
      }
    );

    this.openLibraryService.getCurrentlyReadingBooks().subscribe(
      (data: any) => {
        this.currentlyReadingBooks = data.books || [];
      },
      (error) => {
        console.error('Error fetching Currently Reading books', error);
      }
    );

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