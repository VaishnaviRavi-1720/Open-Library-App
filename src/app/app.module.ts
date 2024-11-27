// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { OpenLibraryService } from './services/open-library.service';
import { WorkEditionComponent } from './work-edition/work-edition.component';
import { HeaderComponent } from './header/header.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { AuthorsComponent } from './authors/authors.component';

@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent,
    WorkEditionComponent,
    HeaderComponent,
    MyBooksComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [OpenLibraryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
