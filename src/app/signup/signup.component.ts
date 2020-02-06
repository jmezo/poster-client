import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';
import { map, catchError } from 'rxjs/operators';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  profilePicture: ImageSnippet;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.signUpForm = new FormGroup({
      'username': new FormControl(null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern(`[a-zA-Z0-9]+`),
          Validators.minLength(3)
        ], this.checkUsername.bind(this)),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
    console.log(this.signUpForm.get('username'));
    
    this.signUpForm.statusChanges.subscribe(status => {
    });
  }

  checkUsername(control: FormControl): Promise<any> | Observable<any> {
    return this.userService.checkUsernameExists(control.value).pipe(
      map(exists => exists ? { 'usernameTaken': true } : null),
      catchError(() => null)
    );
  }

  onSelectImage(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.profilePicture = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  onRemoveImage() {
    this.profilePicture = null;
  }

  onSubmit() {
    if (this.signUpForm.invalid) return;
    this.userService.createUser(
      this.signUpForm.get('username').value,
      this.signUpForm.get('password').value).subscribe(res => {
      console.log(res);
    });
    this.signUpForm.reset();
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }
  
}
