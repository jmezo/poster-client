import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn:'root'})
export class PostService implements OnInit {
  posts = new Subject<Post[]>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {  }

  createPost(formData: FormData) {
    return this.http.post('http://localhost:8080/posts', formData)
  }

  fetchPosts() {
    this.http.get<Post[]>('http://localhost:8080/posts/simple')
      .subscribe(posts => this.posts.next(posts));
  }

  getPostLikes(postId: number) {
    return this.http.get<string[]>('http://localhost:8080/posts/likes/' + postId);
  }

  likePost(postId: number, like: boolean) {
    const likeOrDislike = like ? 'like' : 'dislike';
    return this.http.put(
      'http://localhost:8080/posts/' + likeOrDislike,
      {
        'username': this.authService.user.getValue().username,
        'postId': postId
      }
    );
  }

  deletePost(postId: number) {
    return this.http.delete('http://localhost:8080/posts/' + postId);
  }

}