import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-forum-comment',
  templateUrl: './create-forum-comment.component.html',
  styleUrls: ['./create-forum-comment.component.scss']
})
export class CreateForumCommentComponent implements OnInit, OnDestroy {
  @Output() createCommentEvent = new EventEmitter<string>();
  @Output() closeCommentEvent = new EventEmitter<void>();
  public valid = true;
  public text = '';
  public formGroup = new FormGroup({
    'text' : new FormControl('')
  });
  private subscription = new Subscription();

  public ngOnInit(): void {
      this.subscription.add(
        this.formGroup.valueChanges.subscribe((data) => {
          this.valid = true;
          this.text = data.text;
        })
      );
  }

  public ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  public save(): void{
    if (this.text){
      this.createCommentEvent.emit(this.text);
      this.formGroup.controls['text'].setValue('');
    } else {
      this.valid = false;
    }
  }

  public closeComment(): void{
    this.closeCommentEvent.emit();
  }
}
