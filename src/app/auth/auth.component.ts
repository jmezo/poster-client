import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading: boolean = false;
  error: string;

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

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

  onSignUp() {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '320px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.openSignupSnackbar();
      }
    });
  }
  
  openSignupSnackbar() {
    this._snackBar.open('You can now log in!',null,  {
      duration: 2500,
    });
  }

}

export interface signupData {
  username: string;
  password: string;
}
