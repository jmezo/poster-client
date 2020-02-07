import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Subscription } from 'rxjs';
import { PostService } from '../posts/post.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sortBy: string = 'DATE';
  filterFollowing: boolean = false;

  user: User;
  userSub: Subscription;

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.filterFollowing = this.postService.filterFollowing;
    this.sortBy = this.postService.sortBy;
    this.userSub = this.authService.user
      .subscribe(user => {
        this.user = user;
        this.postService.filterFollowing = false;
        this.postService.sortBy = 'DATE';
      });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onClickFilter() {
    this.postService.filterFollowing = !this.postService.filterFollowing;
    this.filterFollowing = this.postService.filterFollowing;
    this.postService.fetchPostsWithQuery();
  }

  onClickSort() {
    if (this.postService.sortBy == 'DATE') {
      this.postService.sortBy = 'LIKES';  
    } else {
      this.postService.sortBy = 'DATE';
    }
    this.sortBy = this.postService.sortBy;
    this.postService.fetchPostsWithQuery();
  }

}
