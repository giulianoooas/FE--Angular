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
    this.commentService.deleteComment(commentId).subscribe((flag: boolean) =>{
      if (flag){
          const com = [];
          for (const comment of this.comments){
            if (comment.commentId != commentId){
              com.push(comment);
            }
          }
          this.comments = com;
        }
      });

  }

  public createComment(comment: Comment): void{
    this.commentService.createComment(comment).subscribe(
      (res) => {
        if (res.id > 0){
          comment.commentId = res.id;
          this.comments.push(comment);
        }
      }
    );
  }
}
