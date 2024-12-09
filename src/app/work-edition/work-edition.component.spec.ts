import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkEditionComponent } from './work-edition.component';
import { ActivatedRoute } from '@angular/router';
import { OpenLibraryService } from '../services/open-library.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('WorkEditionComponent', () => {
  let component: WorkEditionComponent;
  let fixture: ComponentFixture<WorkEditionComponent>;
  let mockService: jasmine.SpyObj<OpenLibraryService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('OpenLibraryService', ['getWorkDetails', 'getEditions']);

    await TestBed.configureTestingModule({
      declarations: [WorkEditionComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: OpenLibraryService, useValue: mockService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => (key === 'workId' ? 'testWorkId' : null) }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve workId from the route', () => {
    expect(component.workId).toBe('testWorkId');
  });

  it('should fetch work details and trigger fetching editions', () => {
    const mockWorkDetails = { title: 'Test Work', author: 'Test Author' };
    const mockEditions = [{ title: 'Edition 1' }, { title: 'Edition 2' }];

    mockService.getWorkDetails.and.returnValue(of(mockWorkDetails));
    mockService.getEditions.and.returnValue(of(mockEditions));

    component.getWorkDetails();

    expect(mockService.getWorkDetails).toHaveBeenCalledWith('testWorkId');
    expect(component.workDetails).toEqual(mockWorkDetails);

    expect(mockService.getEditions).toHaveBeenCalledWith('testWorkId');
    expect(component.editions).toEqual(mockEditions);
    expect(component.loading).toBeFalse();
  });

  it('should fetch editions and update component state', () => {
    const mockEditions = [{ title: 'Edition 1' }, { title: 'Edition 2' }];

    mockService.getEditions.and.returnValue(of(mockEditions));

    component.getEditions();

    expect(mockService.getEditions).toHaveBeenCalledWith('testWorkId');
    expect(component.editions).toEqual(mockEditions);
    expect(component.loading).toBeFalse();
  });
});
