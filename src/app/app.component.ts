import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'poster-client';
  loggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.autoLogin();
    this.authService.user.subscribe( user => this.loggedIn = !!user);
  }

  ngOnDestroy() {
    this.authService.user.unsubscribe();
  }
}
