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
    // Subscribe to route parameters to get the workId
    this.route.paramMap.subscribe(params => {
      this.workId = params.get('workId') || '';  // Get workId from the route
      this.getWorkDetails();  // Fetch work details
    });
  }

  // Fetch work details and editions from the OpenLibrary service
  getWorkDetails(): void {
    this.openLibraryService.getWorkDetails(this.workId).subscribe((response) => {
      this.workDetails = response;  // Handle the response with work details
      this.getEditions(); // Get editions of this work
    });
  }

  // Fetch editions of the work from the OpenLibrary service
  getEditions(): void {
    this.openLibraryService.getEditions(this.workId).subscribe((response) => {
      this.editions = response; // Handle the response with editions
      this.loading = false;
    });
  }
}
// for this following methods write a angular test cases in work-edition.component.spec.ts
