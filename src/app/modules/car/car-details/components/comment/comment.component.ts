import { formatDate } from '../../../../../utils/format-date';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  public date: string;

  @Output() private deleteComment: EventEmitter<number>= new EventEmitter<number>();

  @Input() public comment: Comment;

  public constructor() { }

  public ngOnInit(): void {
    this.setComment();
  }

  private setComment(): void{
    this.carId=this.comment.carId;
    this.commentId=this.comment.commentId;
    this.date=formatDate(new Date(this.comment.date));
    this.message=this.comment.message;
  }

  public delete(): void{
    this.deleteComment.emit(this.commentId);
  }
}
