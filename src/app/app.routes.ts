import { Routes } from '@angular/router';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserListComponent } from './pages/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: UserListComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailsComponent,
  },
];
