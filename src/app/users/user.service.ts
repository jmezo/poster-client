import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class UserService {
  currentUserFollowings: string[] = [];
  followingSub = new BehaviorSubject<string[]>(this.currentUserFollowings);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.user.subscribe(user => {
      if (user == null) return;
      this.fetchCurrentUserFollowing();
    })
    console.log('userservice remélem csak egyszer fut le');
  }

  checkUsernameExists(username: string) {
    return this.http.get<boolean>('http://localhost:8080/users/checkUsername/' + username);
  }

  checkHasImage(username: string) {
    return this.http.get<boolean>('http://localhost:8080/users/checkImage/' + username);
  }

  createUser(formData: FormData) {
    return this.http.post('http://localhost:8080/users', formData);
  }

  private fetchCurrentUserFollowing() {
    this.http.get<string[]>(
      'http://localhost:8080/users/following/' + this.authService.user.getValue().username
    ).subscribe(users => {
      this.currentUserFollowings = users;
      this.followingSub.next(this.currentUserFollowings);
    });
  }

  setFollowing(username: string) {
    if (this.currentUserFollowings.indexOf(username) === -1) {
      this.currentUserFollowings.push(username);
    } else {
      this.currentUserFollowings.splice(this.currentUserFollowings.indexOf(username), 1);
    }
    this.http.put(
      'http://localhost:8080/users/'
      + this.authService.user.getValue().username
      + '/follow/' + username, null)
      .subscribe();
    this.followingSub.next(this.currentUserFollowings);
  }

}