import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { of } from 'rxjs';
import { UserService } from '../../services/user-service.service';
import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  // Create a mock ActivatedRoute object
  const activatedRouteMock = {
    snapshot: { paramMap: { get: () => '1' } },
  };

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }, // Provide the mock ActivatedRoute
      ],
    }).compileComponents();

    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render a header with class and text content', () => {
    const headerElement = fixture.debugElement.query(By.css('.mb-8.text-3xl.text-center'));
    expect(headerElement).toBeTruthy();

    const headerText = headerElement.nativeElement.textContent.trim();
    expect(headerText).toBe('List of Users');
  });

  it('should render the table header with specific columns', () => {
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

  it('should call getUser method and set users when ngOnInit is called', () => {
    const userData = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];
    userService.getUsers.and.returnValue(of(userData));

    fixture.detectChanges();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual([...userData]);
    expect(component.loading).toBe(false);
  });
});
