import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-post-footer',
  templateUrl: './post-footer.component.html',
  styleUrls: ['./post-footer.component.css']
})
export class PostFooterComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  likes: string[] = [];
  likesSub: Subscription;
  likedByUser: boolean = false;
  currentUser: string;


  constructor(private postService: PostService,private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.user.getValue().username
    this.likesSub = this.postService.getPostLikes(this.post.id).subscribe(likes => {
      this.likes = likes;
      this.likedByUser = likes.indexOf(this.currentUser) > -1;
    })
  }

  onLikeClick() {
    this.postService.likePost(this.post.id, !this.likedByUser).subscribe( res => {
      if (this.likedByUser) {
        this.unlikePost();
      } else {
        this.likePost();
      }
    });
  }

  private likePost() {
    this.likedByUser = true;
    this.likes.push(this.currentUser);
  }

  private unlikePost() {
    this.likedByUser = false;
    this.likes.splice(this.likes.indexOf(this.currentUser), 1);
  }

  ngOnDestroy() {
    this.likesSub.unsubscribe();
  }

}
