import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserType } from '../../interfaces/user';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: Array<UserType> = [];
  loading = true;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users: Array<UserType>) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        console.log(error);
      },
    });
  }
}
