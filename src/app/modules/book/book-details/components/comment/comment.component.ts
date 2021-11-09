import { formatDate } from '../../../../../utils/format-date';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Comment } from 'src/app/models/comment.model';
import { FormControl, FormGroup } from '@angular/forms';
import {Subscription } from 'rxjs';
import { MAX_INPUT_CONSTANT_LENGTH_COMMENTS } from 'src/app/constants/input-max-length.constant';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {
  public commentId: number;
  public bookId: number;
  public message: string;
  public date: string;
  public editedComment: Comment;
  public isEditable = false;
  public formGroup: FormGroup;
  public subscription: Subscription = new Subscription();
  public maxLength = MAX_INPUT_CONSTANT_LENGTH_COMMENTS;

  @Input() isAdmin: boolean;
  @Input() userId: number;
  @Output() private deleteComment: EventEmitter<number> = new EventEmitter<number>();
  @Output() private editComment: EventEmitter<Comment>=
    new EventEmitter<Comment>();
  @Input() public comment: Comment;

  public constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.setComment();
    this.saveChanges();
  }

  private setComment(): void{
    this.bookId=this.comment.bookId;
    this.commentId=this.comment.commentId;
    this.date=formatDate(new Date(this.comment.date));
    this.message=this.comment.message;
    this.editedComment = {
      bookId:this.bookId,
      commentId: this.commentId,
      message: this.message,
      date: new Date(),
      userId: this.authService.getUserId()
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
