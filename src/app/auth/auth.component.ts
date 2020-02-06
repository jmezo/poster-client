import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;
  error: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.user.getValue() != null) {
      this.router.navigate(['home']);
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    const username = form.value.username;
    const password = form.value.password;
    this.authService.login(username, password)
      .subscribe(
        token => {this.isLoading = false; this.router.navigate(['/home'])},
        error => {this.isLoading = false; this.error = error;}
      );
    // form.reset();
  }

}
