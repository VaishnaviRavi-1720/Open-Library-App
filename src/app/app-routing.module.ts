import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkEditionComponent } from './work-edition/work-edition.component'; 
import { MyBooksComponent } from './my-books/my-books.component';
import { BookSearchComponent } from './components/book-search/book-search.component';
import { AuthorsComponent } from './authors/authors.component';

const routes: Routes = [
  { path: '', component: BookSearchComponent }, // Default route
  { path: 'works', component: WorkEditionComponent },
  { path: 'books', component: MyBooksComponent },
  { path: 'authors', component: AuthorsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}