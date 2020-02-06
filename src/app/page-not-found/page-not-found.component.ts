import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    if (!!this.authService.user.getValue()) {
      this.isLoggedIn = true;
    }
    console.log('wtf:: ' + this.isLoggedIn)
  }

  redirect() {
    const navPath: string = this.isLoggedIn ? '/home' : '/login';
    this.router.navigate([navPath]);
  }
}
