import { formatDate } from '../../../../../utils/format-date';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { FormControl, FormGroup } from '@angular/forms';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  public commentId: number;
  public carId: number;
  public message: string;
  public date: string;
  public editedComment: Comment;
  public isEditable = false;
  public formGroup: FormGroup;
  public subscription: Subscription = new Subscription();

  @Output() private deleteComment: EventEmitter<number> = new EventEmitter<number>();
  @Output() private editComment: EventEmitter<Comment>=
    new EventEmitter<Comment>();
  @Input() public comment: Comment;

  public constructor() { }

  public ngOnInit(): void {
    this.setComment();
    this.saveChanges();
  }

  private setComment(): void{
    this.carId=this.comment.carId;
    this.commentId=this.comment.commentId;
    this.date=formatDate(new Date(this.comment.date));
    this.message=this.comment.message;
    this.editedComment = {
      carId:this.carId,
      commentId: this.commentId,
      message: this.message,
      date: new Date(),
    }
  }

  private saveChanges(): void{
    this.formGroup = new FormGroup({
      message: new FormControl(this.message)
    });
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        if(!!data.message)
          this.editedComment.message = data.message;
      })
    );
  }

  public edit(): void{
    this.editedComment.date = new Date();
    this.editComment.emit(this.editedComment);
    this.message = this.editedComment.message;
    this.date = formatDate(this.editedComment.date);
    this.makeUnEditable();
  }

  public makeEditable(): void{
    this.isEditable = true;
  }

  public makeUnEditable(): void{
    this.formGroup.controls['message'].setValue(this.message);
    this.isEditable= false;
  }

  public delete(): void{
    this.deleteComment.emit(this.commentId);
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
