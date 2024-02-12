import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserType } from '../interfaces/user';

const BASE_URL = 'https://jsonplaceholder.typicode.com/users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  getUsers(): Observable<Array<UserType>> {
    return this.http.get<Array<UserType>>(BASE_URL);
  }
  getUserByID(id: any): Observable<UserType> {
    return this.http.get<UserType>(`${BASE_URL}/${id}`);
  }
}
