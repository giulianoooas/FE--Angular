import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TextValidatorAPI } from 'src/app/services/text-validator.api.service';
import { MAX_INPUT_CONSTANT_LENGTH_COMMENTS } from '../../../../../constants/input-max-length.constant';
import { Comment } from '../../../../../models/comment.model';
import { AuthService } from '../../../../../services/auth.service';

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

  public maxLength = MAX_INPUT_CONSTANT_LENGTH_COMMENTS;
  @Input()public bookId: number;
  @Output()public save: EventEmitter<Comment>= new EventEmitter<Comment>();

  public constructor(private authService: AuthService,
    private textValidatorApi: TextValidatorAPI){}

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
      bookId:this.bookId,
      date:new Date(),
      message: '',
      userId: this.authService.getUserId()
    }
  }

  public createComment(): void{
    this.comment.date = new Date();
    const comment = {...this.comment};
    this.textValidatorApi.getTextStatus(this.comment.message).subscribe((data) => {

      if (data == '1'){
        this.save.emit(comment);
      }
    });
    this.comment.message = '';
    this.formGroup.controls['message'].setValue('');
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
