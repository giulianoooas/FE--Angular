import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  public comments: Comment[] = [];

  @Input() public carId: number;

  constructor(private commentService: CommentService) { }

  public ngOnInit(): void {
    this.commentService.getCommentsByCarId(this.carId).subscribe((comments) => {
      this.comments = comments;
    })
  }

  public deleteComment(commentId: number): void{
    this.commentService.deleteComment(commentId).subscribe();
    this.comments = this.comments.filter((comment) => {
      comment.commentId != commentId
    })
  }

}
