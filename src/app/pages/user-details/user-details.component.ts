import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserType, UserWithImageType } from '../../interfaces/user';
import { UserService } from '../../services/user-service.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: UserWithImageType = {} as UserWithImageType;
  loading = true;

  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getUser(this.route.snapshot.paramMap.get('id') as string);
  }

  getUser(id: string): void {
    this.userService.getUserByID(id).subscribe({
      next: (user: UserType) => {
        this.user = {
          ...user,
          imgUrl: `https://source.unsplash.com/random/800x800/?img=${user.id}`,
        };
        this.loading = false;
      },
      error: (e) => {
        this.loading = false;
        console.error(e);
      },
    });
  }
}
