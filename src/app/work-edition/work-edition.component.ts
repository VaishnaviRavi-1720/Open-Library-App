import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OpenLibraryService } from '../services/open-library.service';

@Component({
  selector: 'app-work-edition',
  templateUrl: './work-edition.component.html',
  styleUrls: ['./work-edition.component.css']
})
export class WorkEditionComponent implements OnInit {
  workId: string = '';
  workDetails: any = {};
  editions: any[] = [];
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private openLibraryService: OpenLibraryService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.workId = params.get('workId') || ''; 
      this.getWorkDetails(); 
    });
  }

  getWorkDetails(): void {
    this.openLibraryService.getWorkDetails(this.workId).subscribe((response) => {
      this.workDetails = response;
      this.getEditions();
    });
  }

  getEditions(): void {
    this.openLibraryService.getEditions(this.workId).subscribe((response) => {
      this.editions = response;
      this.loading = false;
    });
  }
}
