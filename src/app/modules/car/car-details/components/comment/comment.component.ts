import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  public commentId: number;
  public carId: number;
  public message: string;
  public date: Date;

  @Input() public comment: Comment;

  public constructor() { }

  public ngOnInit(): void {
    this.setComment();
  }

  private setComment(): void{
    this.carId=this.comment.carId;
    this.commentId=this.comment.commentId;
    this.date=this.comment.date;
    this.message=this.comment.message;
  }

}
