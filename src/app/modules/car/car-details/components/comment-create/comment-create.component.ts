import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MAX_INPUT_CONSTANT_LENGTH } from 'src/app/constants/comment-max-length.constant';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnInit, OnDestroy {
  public comment: Comment;
  public formGroup: FormGroup = new FormGroup({
    message: new FormControl('')
  });
  public subscription: Subscription = new Subscription();

  public maxLength = MAX_INPUT_CONSTANT_LENGTH;
  @Input()public carId: number;
  @Output()public save: EventEmitter<Comment>= new EventEmitter<Comment>();

  public ngOnInit(): void {
    this.setCreatedComment();
    this.createSubscriptionForForm();
  }

  private createSubscriptionForForm(): void{
    this.subscription.add(
      this.formGroup.valueChanges.subscribe((data) => {
        if (!!data?.message)
          this.comment.message = data.message;
      })
    );
  }

  private setCreatedComment(): void{
    this.comment={
      commentId: -1,
      carId:this.carId,
      date:new Date(),
      message: ''
    }
  }

  public createComment(): void{
    this.comment.date = new Date();
    this.save.emit(this.comment);
    this.comment.message = '';
    this.formGroup.controls['message'].setValue('');
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
