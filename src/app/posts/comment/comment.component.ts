import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './comment.model';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() postId: number;
  commentText: string;
  comments: Comment[];

  constructor(private commentService: CommentService) { }

  ngOnInit() {
    if (!!this.postId) {
      this.commentService.getCommentsOfPost(this.postId)
        .subscribe(comments => this.comments = comments);
    }
  }

  onAddComment() {
    this.commentService.addCommentToPost(this.postId, this.commentText)
      .subscribe( res => {
        this.commentText = null;
        this.getComments();
      });
  }

  private getComments() {
    if (!!this.postId) {
      this.commentService.getCommentsOfPost(this.postId)
        .subscribe(comments => this.comments = comments);
    }
  }

}
