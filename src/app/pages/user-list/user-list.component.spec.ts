import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render a header with class and text content', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const headerElement = fixture.debugElement.query(By.css('.mb-8.text-3xl.text-center'));
    expect(headerElement).toBeTruthy();

    const headerText = headerElement.nativeElement.textContent.trim();
    expect(headerText).toBe('List of Users');
  });

  it('should render the table header with specific columns', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const headerRow = fixture.debugElement.query(By.css('thead tr'));
    expect(headerRow).toBeTruthy();

    const headerCells = headerRow.queryAll(By.css('th'));
    expect(headerCells.length).toBe(5);

    const columnLabels = ['No', 'Name', 'Email', 'Website', ''];
    headerCells.forEach((cell, index) => {
      const cellText = cell.nativeElement.textContent.trim();
      const cellClass = cell.nativeElement.getAttribute('class');
      expect(cellText).toBe(columnLabels[index]);
      expect(cellClass).toContain('p-4');
      if (index !== 4) {
        expect(cellClass).toContain('text-left');
      }
    });
  });
});
