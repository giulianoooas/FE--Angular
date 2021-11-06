import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss']
})
export class CommentsListComponent implements OnInit {
  public comments: Comment[] = [];
  public userId: number;

  @Input() public carId: number;

  constructor(private commentService: CommentService, private authService: AuthService) { }

  public ngOnInit(): void {
    this.commentService.getCommentsByCarId(this.carId).subscribe((comments) => {
      this.comments = comments;
    })
    this.userId = this.authService.getUserId();
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
      (com) => {
        this.comments.push(com);
      }
    );
  }

  public editComment(comment: Comment): void{
    this.commentService.editComment(comment).subscribe((comment:Comment) => {
      for (const com of this.comments){
        if (com.commentId == comment.commentId){
          com.date = new Date(comment.date);
          com.message = comment.message;
          break;
        }
      }
    })
  }
}
