import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';

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
          // Validators.pattern(`[a-zA-Z0-9]+`),
          Validators.minLength(3)
        ]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
    console.log(this.signUpForm.get('username'));
  }

  checkUsername(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      this.userService.checkUsernameExists(control.value).subscribe(val => {
        if (val) {
          resolve({'usernameIsTaken': true});
        } else {
          resolve(null);
        }
      })
    });
    return promise;
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
    console.log(this.signUpForm);
    this.userService.createUser(this.signUpForm.get('username').value, this.signUpForm.get('password').value).subscribe(res => {
      console.log(res);
    });
    this.signUpForm.reset();
  }
  
}
