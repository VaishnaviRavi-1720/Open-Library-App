import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule] 
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links correctly', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('a'));

    expect(navLinks.length).toBe(4); // There should be 4 navigation links

    const linkTexts = navLinks.map(link => link.nativeElement.textContent.trim());

    expect(linkTexts).toContain('Book Search');
    expect(linkTexts).toContain('Work and Edition');
    expect(linkTexts).toContain('My Books');
    expect(linkTexts).toContain('Authors');
  });

  it('should have a <router-outlet> element', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy(); 
  });

  it('should navigate to the correct route when a link is clicked', () => {
    const bookSearchLink = fixture.debugElement.query(By.css('a[routerLink="/"]'));
    bookSearchLink.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(window.location.pathname).toBe('/');
  });
});
