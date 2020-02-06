import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';



interface AuthToken {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  jti: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('fooClientIdPassword:secret')
    });
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('username', username)
      .set('password', password);
    return this.http.post<AuthToken>('http://localhost:8080/oauth/token', body, {headers})
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(username, resData))
      );
  }

  autoLogin() {
    const userData: {
      username: string,
      access_token: string,
      expirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.username, userData.access_token, new Date(userData.expirationDate));
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const timeLeft = loadedUser._expirationDate.getTime() - new Date().getTime();
      this.autoLogout(timeLeft);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(timeLeft: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, timeLeft);
  }

  private handleAuthentication(username: string, resData: AuthToken) {
    const expirationDate = new Date(new Date().getTime() + resData.expires_in * 1000)
    const user = new User(username, resData.access_token, expirationDate);
    this.user.next(user);
    this.autoLogout(resData.expires_in * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes)
    let errorMessage = 'unknown error';
    if (!errorRes.error || ! errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error) {
      case 'invalid_grant':
        errorMessage = 'Incorrect username or password!';
    }
    return throwError(errorMessage);
  }

}
