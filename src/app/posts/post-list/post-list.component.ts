import { Component, OnInit, HostListener } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../post.model';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  numOfCols: number;
  posts: Post[];
  postSub: Subscription;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.numOfCols = (window.innerWidth <= 1100) ? 1 : 2;
    this.postSub = this.postService.posts.subscribe(posts => {this.posts = posts;});
    this.postService.fetchPosts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.numOfCols = (event.target.innerWidth <= 1100) ? 1 : 2;
  }

}
