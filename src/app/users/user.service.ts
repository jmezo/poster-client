import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {

  constructor(private http: HttpClient) { }

  checkUsernameExists(username: string) {
    return this.http.get<boolean>('http://localhost:8080/users/checkUsername/' + username);
  }

  createUser(username: string, password: string) {
    return this.http.post(
      'http://localhost:8080/users',
      {
        'username': username,
        'password': password
      });
  }
}