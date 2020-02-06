import { Injectable } from "@angular/core";
import { Comment } from './comment.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({providedIn: 'root'})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCommentsOfPost(postId: number) {
    const params = new HttpParams().set('postId', postId + '');
    return this.http.get<Comment[]>('http://localhost:8080/comments/', {params});
  }

  addCommentToPost(postId: number, text: string) {
    return this.http.post(
      'http://localhost:8080/comments/',
      {
        'postId': postId,
        'username': this.authService.user.getValue().username,
        'text': text
      });
  }

}