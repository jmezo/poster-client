import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '../users/user.service';
import { map, catchError } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  isImageTooLarge: boolean = false;

  constructor(private userService: UserService,
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    if (file.size > 999999) {
      this.isImageTooLarge = true;
    }
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.profilePicture = new ImageSnippet(event.target.result, file);
    });
    reader.readAsDataURL(file);
  }

  onRemoveImage() {
    this.profilePicture = null;
    this.isImageTooLarge = false;
  }

  onSubmit() {
    if (this.signUpForm.invalid) return;
    this.userService.createUser(this.createFormData()).subscribe(res => {
      console.log(res);
    });
    this.signUpForm.reset();
    this.dialogRef.close({username: this.username.value, password: this.password.value});
  }

  get username() {
    return this.signUpForm.get('username');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  private createFormData() {
    const fd = new FormData();
    fd.append('username', this.username.value);
    fd.append('password', this.password.value);
    if (this.profilePicture != null) {
      fd.append('image', this.profilePicture.file);
    }
    return fd;
  }
  
}
