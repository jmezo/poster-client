import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../post.model';
import { AuthService } from 'src/app/auth/auth.service';
import { PostService } from '../post.service';

@Component({
  selector: 'app-detailed-post',
  templateUrl: './detailed-post.component.html',
  styleUrls: ['./detailed-post.component.css']
})
export class DetailedPostComponent implements OnInit {
  loggedInUser: string;
  canDeletePost: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DetailedPostComponent>,
    @Inject(MAT_DIALOG_DATA) public post: Post,
    private authService: AuthService,
    private postService: PostService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.loggedInUser = this.authService.user.getValue().username;
    if (this.loggedInUser === this.post.creator) {
      this.canDeletePost = true;
    }
  }

  onDeletePost() {
    this.postService.deletePost(this.post.id).subscribe(res => {
      this.dialogRef.close();
    }, err => console.log(err))
  }

}
