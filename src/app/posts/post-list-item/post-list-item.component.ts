import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailedPostComponent } from '../detailed-post/detailed-post.component';

import { PostService } from '../post.service';
import { Post } from '../post.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {
  @Input() post: Post;

  constructor(private postService: PostService, public dialog: MatDialog) { }

  ngOnInit() { }

  openPostInDialog(clickedPost: Post) {
    const dialogRef = this.dialog.open(DetailedPostComponent, {
      width: '522px',
      data: clickedPost
    });
    dialogRef.afterClosed().subscribe(result => { this.postService.fetchPosts()});
  }

}
